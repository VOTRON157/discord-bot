import EventsConfig from '../Sructures/Events'
import Bot from '../Sructures/Bot'
import { Events } from 'discord.js'

export default new class implements EventsConfig {
    public name = Events.ClientReady
    public run = (client: typeof Bot) => {
        client.Logger.Log(`Client iniciado, atualmente em ${client.guilds.cache.size} servidor(es).`)
        client.user?.setActivity({
            name: 'Online e pronto para voar ao seu lado!'
        })
    }
}