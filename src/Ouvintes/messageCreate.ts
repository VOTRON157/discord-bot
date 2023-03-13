import EventsConfig from '../Classes/Events'
import Bot from '../Classes/Bot'
import { Events, Message } from 'discord.js'

export default class implements EventsConfig {
    public name = Events.MessageCreate
    public run = (client: Bot, message: Message) => {
        if(message.author.id != client.user?.id)
        message.reply('Olá!')
    }
}