import Command  from '../Sructures/Commands'
import Bot from '../Sructures/Client'
import { UserContextMenuCommandInteraction } from 'discord.js'
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders'

export default new class implements Command {
    public data = new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Veja o avatar do seu amigo.')
    .addUserOption((option) => option
    .setName('usuario').setDescription('O usuario que você deseja ver o avatar').setRequired(false)).toJSON()
    public run = (client: typeof Bot, interaction: UserContextMenuCommandInteraction) => {
        const user = interaction.options.getUser('usuario') || interaction.user
        const avatarURL = user?.displayAvatarURL({size: 4096, extension: 'png'})
        const embed = new EmbedBuilder()
        .setColor(0xffff)
        .setImage(avatarURL)
        interaction.reply({
            embeds: [embed]
        })
    }
}