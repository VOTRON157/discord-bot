import Bot from './Classes/Bot'
import { IntentsBitField } from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()

const client: Bot = new Bot({
    intents: [IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
})


client.login(process.env.TOKEN)