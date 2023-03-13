import Command from '../Classes/Commands'
import { SlashCommandBuilder, UserContextMenuCommandInteraction} from 'discord.js'

export default class implements Command {
    public data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('A ping command!')
    public run = (interaction: UserContextMenuCommandInteraction) => {
        interaction.reply('Funcionando?')
    }
}