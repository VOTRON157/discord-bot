import EventsConfig from '../Classes/Events'
import Bot from '../Classes/Bot'
import { Events } from 'discord.js'

export default new class implements EventsConfig {
    public name = Events.ClientReady
    public run = (client: Bot) => {
        console.log(`Bot rodando em ${client.guilds.cache.size} servidores!`)
        client.user?.setActivity({
            name: 'Online e pronto para voar ao seu lado!'
        })
    }
}