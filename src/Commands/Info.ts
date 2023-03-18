import Command from '../Sructures/Commands'
import Bot from '../Sructures/Client'
import { ChatInputCommandInteraction, Guild, ChannelType } from 'discord.js'
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
    public run = async (client: typeof Bot, interaction: ChatInputCommandInteraction) => {
        switch(interaction.options.getSubcommand()){
            case 'user':
                const user = interaction.options.getUser('user') || interaction.user
                const guildMember = interaction.guild?.members.cache.get(user.id)
                const avatarURL = user?.displayAvatarURL({ size: 4096, extension: 'png' })
                const userEmbed = new EmbedBuilder()
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
                    userEmbed.addFields({
                        name: '🏠 ➝ Membro deste',
                        value: `<t:${Math.trunc(guildMember?.joinedTimestamp as number / 1000) - 1}:F>`,
                    }, {
                        name: `💼 ➝ Cargos (${guildMember.roles.cache.size})` ,
                        value: `${guildMember.roles.cache.map(role =>  role).join(', ').replace(', @everyone', '').slice(0, 1024)}`,
                        inline: true
                    })
                }
                interaction.reply({
                    embeds: [userEmbed]
                })
            break;
            case 'server':
                const guild = interaction.guild as Guild 
                const guildEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTimestamp()
                .setTitle(`🔍 ${guild.name}`)
                .setThumbnail(guild.iconURL({
                    size: 4096,
                    extension: 'png'
                }))
                .addFields({
                    name: '🪪 ➝ ID do servidor',
                    value: guild.id,
                    inline: true
                }, {
                    name: '🌠 ➝ Servidor criado em',
                    value: `<t:${Math.trunc(guild.createdTimestamp / 1000)}:F>`,
                    inline: true
                }, {
                    name: '👑 ➝ Dono',
                    value: `<@!${guild.ownerId}>`,
                    inline: true
                }, {
                    name: '🗨️ ➝ Canais',
                    value: `**Texto:** ${guild.channels.cache.filter(ch => ch.type == ChannelType.GuildText).size}\n**Voz:** ${guild.channels.cache.filter(ch => ch.type == ChannelType.GuildVoice).size}`
                })
                await interaction.reply({
                    embeds: [guildEmbed]
                })
        }
    }
}