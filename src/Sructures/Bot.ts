import { Client, RESTPostAPIChatInputApplicationCommandsJSONBody, REST, Routes, IntentsBitField } from 'discord.js'
import Logger from './Logger'
import { readdirSync } from 'fs'
import Command from './Commands'
import Events from './Events'

export default new class Bot extends Client {
    readonly commands: Array<Command>;
    readonly events: Array<object>;
    readonly Logger: Logger;
    constructor() {
        super({
            intents: [IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
        })
        this.Logger = new Logger()
        this.commands = []
        this.events = []
        this.setup()
    }

    private async setup(): Promise<void> {
        await this.setupEvents()
        await this.setupCommands()
        this.Logger.Alert('Inicializando o client.')
        this.login(process.env.TOKEN)
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
            this.commands.push(props)
        }
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);
        try {
            this.Logger.Alert('Começando a enviar os comandos.')
            const data = await rest.put(
                Routes.applicationCommands(process.env.clientID as string),
                { body: this.commands.map(cmd => cmd.data) },
            ) as Array<RESTPostAPIChatInputApplicationCommandsJSONBody>;

            this.Logger.Log(`Sucesso! Foram enviados ${data.length} comando(s).`)
        } catch (error: any) {
            this.Logger.Error(error.message)
        }
    }
}