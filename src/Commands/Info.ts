import Command from '../Sructures/Commands'
import Bot from '../Sructures/Client'
import { UserContextMenuCommandInteraction, ChatInputCommandInteraction } from 'discord.js'
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders'
import config from '../Config/Client'

export default new class implements Command {
    public data = new SlashCommandBuilder()
        .setName('info')
        .setDescription('⭐ Diversos ➝ Veja informações variadas.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('❓ ➝ Informações sobre o usúario.')
                .addUserOption(option => option.setName('user').setDescription('🤔 ➝ O usúario.')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('❓ ➝ Informações sobre o servidor.'))
        .toJSON()
    public run = (client: typeof Bot, interaction: ChatInputCommandInteraction) => {
        switch(interaction.options.getSubcommand()){
            case 'user':
                const user = interaction.options.getUser('user') || interaction.user
                const guildMember = interaction.guild?.members.cache.get(user.id)
                const avatarURL = user?.displayAvatarURL({ size: 4096, extension: 'png' })
                const embed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTimestamp()
                .setTitle(`🔍 ${user.tag}`)
                .addFields({
                    name: '🪪 ➝ Id do Discord',
                    value: '`' + user.id + '`',
                    inline: true
                }, {
                    name: '📅 ➝ Conta criada em',
                    value: `<t:${Math.trunc(user.createdTimestamp / 1000)}:F>`,
                    inline: true
                })
                .setThumbnail(avatarURL)
                if(guildMember){
                    embed.addFields({
                        name: '🏠 ➝ Membro deste',
                        value: `<t:${Math.trunc(guildMember?.joinedTimestamp as number / 1000)}:F>`,
                    }, {
                        name: `💼 ➝ Cargos (${guildMember.roles.cache.size})` ,
                        value: `${guildMember.roles.cache.map(role =>  role).join(', ')}`,
                        inline: true
                    })
                }
                interaction.reply({
                    embeds: [embed]
                })
            break;
            case 'server':
                interaction.reply({
                    content: 'Soon...'
                })
        }
    }
}