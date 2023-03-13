import Command from '../Classes/Commands'
import { SlashCommandBuilder, UserContextMenuCommandInteraction } from 'discord.js'

export default class implements Command {
    public data = new SlashCommandBuilder()
    .setName('pong')
    .setDescription('A pong! command!')
    public run = (interaction: UserContextMenuCommandInteraction) => {
        console.log('Funcionando?')
    }
}