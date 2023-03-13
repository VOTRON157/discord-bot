import { Client, ClientOptions, RESTPostAPIChatInputApplicationCommandsJSONBody, REST, Routes } from 'discord.js'
import { readdirSync } from 'fs'

export default class Bot extends Client {
    readonly commands: Array<RESTPostAPIChatInputApplicationCommandsJSONBody>;
    readonly events: Array<object>;
    constructor(client: ClientOptions) {
        super(client)
        this.commands = []
        this.events = []
        this.setupEvents()
        this.setupCommands()
    }

    private async setupEvents(): Promise<void> {
        const commandsFolder = readdirSync('./src/Ouvintes')
        for (var command of commandsFolder) {
            const eventClass = require('../Ouvintes/' + command.replace('.ts', '')).default
            const props = new eventClass();
            this.on(props.name, (...args) => props.run(this, ...args))
        }
    }

    private async setupCommands(): Promise<void> {
        const commandsFolder = readdirSync('./src/Commands')
        for (var command of commandsFolder) {
            const cmdClass = require('../Commands/' + command.replace('.ts', '')).default
            const props = new cmdClass();
            this.commands.push(props.data)
        }
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);
        try {
            console.log(`Started refreshing ${this.commands.length} application (/) commands.`);
            const data = await rest.put(
                Routes.applicationCommands(process.env.clientID as string),
                { body: this.commands },
            ) as Array<RESTPostAPIChatInputApplicationCommandsJSONBody>;

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    }
}