import Command from '../Sructures/Commands'
import Bot from '../Sructures/Bot'
import { SlashCommandBuilder, UserContextMenuCommandInteraction} from 'discord.js'

export default new class implements Command {
    public data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('A ping command!')
    public run = (client: typeof Bot, interaction: UserContextMenuCommandInteraction) => {
        interaction.reply('Pong!')
    }
}