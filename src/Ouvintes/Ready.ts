import EventsConfig from '../Sructures/Events'
import Bot from '../Sructures/Client'
import { Events } from 'discord.js'

export default new class implements EventsConfig {
    public name = Events.ClientReady
    public run = (client: typeof Bot) => {
        client.Logger.Log(`Client iniciado, atualmente em ${client.guilds.cache.size} servidor(es).`)
        const listOfStatus: Array<string> = ["Tropa do calvo", "Mim de papai!", "Lá ele"]
        client.user?.setStatus('invisible') // ñ faz sentido mudar o status com o bot invisivel né? xd
        const statusChanger = () => {
            const status = listOfStatus[Math.floor(Math.random() * listOfStatus.length)]
            client.user?.setActivity({
                name: status
            })
        }
        setInterval(() => statusChanger(), 30000)
    }
}