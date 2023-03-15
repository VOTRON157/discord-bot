import { Client, IntentsBitField, REST, Routes, ClientEvents, Events} from 'discord.js'
import Logger from './Logger'
import { readdirSync } from 'fs'
import Command from './Commands'
import Event from './Events'

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

    private async setupEvents(): Promise<void> { // Reunir todos os enventos para adicionar ao client.
        const eventsFolder: Array<string> = readdirSync('./src/Ouvintes')
        for (var event of eventsFolder) {
            let { default: props }: Event = await import(`../Ouvintes/${event}`)
            this.on(props?.name as string, (...args) => props?.run(this, ...args))
        }
    }

    private async setupCommands(): Promise<void> { // Reunir todos os comandos e mandar para a API.
        try {
            const commandsFolder: Array<string> = readdirSync('./src/Commands')
            for (var command of commandsFolder) {
                const { default: props }: Command = await import(`../Commands/${command}`)
                this.commands.push(props as Command)
            }
            this.Logger.Alert('Começando a enviar os comandos.')
            const commands = this.commands.map(cmd => cmd.data)
            const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);
            await rest.put(Routes.applicationCommands(process.env.clientID as string), {
                body: commands,
            });
            this.Logger.Log(`Sucesso! Foram enviados ${this.commands.length} comando(s).`)
        } catch (error: any) {
            this.Logger.Error(error.stack)
        }
    }
}