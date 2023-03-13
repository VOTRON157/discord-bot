import { Client, ClientOptions, RESTPostAPIChatInputApplicationCommandsJSONBody, REST, Routes, SlashCommandBuilder } from 'discord.js'
import { readdirSync } from 'fs'
import Command from './Commands'
import Events from './Events'

export default class Bot extends Client {
    readonly commands: Array<SlashCommandBuilder>;
    readonly events: Array<object>;
    constructor(client: ClientOptions) {
        super(client)
        this.commands = []
        this.events = []
        this.setupEvents()
        this.setupCommands()
    }

    private async setupEvents(): Promise<void> {
        const eventsFolder: Array<string> = readdirSync('./src/Ouvintes')
        for (var event of eventsFolder) {
            const props: Events = require('../Ouvintes/' + event.replace('.ts', '')).default
            this.on(props.name, (...args) => props.run(this, ...args))
        }
    }

    private async setupCommands(): Promise<void> {
        const commandsFolder: Array<string> = readdirSync('./src/Commands')
        for (var command of commandsFolder) {
            const props: Command = require('../Commands/' + command.replace('.ts', '')).default
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