import Command  from '../Sructures/Commands'
import Bot from '../Sructures/Client'
import { UserContextMenuCommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export default new class implements Command {
    public data = new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Veja o avatar do seu amigo.')
    .addUserOption((option) => option
    .setName('usuario').setDescription('O usuario que você deseja ver o avatar').setRequired(false)).toJSON()
    public run = (client: typeof Bot, interaction: UserContextMenuCommandInteraction) => {
        const user = interaction.options.getUser('usuario') || interaction.user
        interaction.reply({
            content: `Avatar do marmanjo: ${user?.displayAvatarURL({size: 4096, extension: 'png'})}`
        })
    }
}