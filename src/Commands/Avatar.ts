import Command from '../Sructures/Commands'
import Bot from '../Sructures/Client'
import { UserContextMenuCommandInteraction } from 'discord.js'
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders'
import config from '../Config/Client'

export default new class implements Command {
    public data = new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('⭐ Diversos ➝ Veja o avatar de qualuer usúario.')
        .addUserOption((option) => option
            .setName('user').setDescription('🤔 ➝ O usuario que você deseja ver o avatar.').setRequired(false)).toJSON()
    public run = (client: typeof Bot, interaction: UserContextMenuCommandInteraction) => {
        const user = interaction.options.getUser('user') || interaction.user
        const avatarURL = user?.displayAvatarURL({ size: 4096, extension: 'png' })
        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription(`:frame_photo: [Avatar de: ${user.tag}](${avatarURL}) ${user.id == client.user?.id ? '(sou bonita né?)' : ''}`)
            .setImage(avatarURL)
            .setTimestamp()
        interaction.reply({
            embeds: [embed]
        })
    }
}