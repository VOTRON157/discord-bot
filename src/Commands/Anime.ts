import Command from '../Sructures/Commands'
import Bot from '../Sructures/Client'
import { UserContextMenuCommandInteraction, ButtonStyle, ComponentType } from 'discord.js'
import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, time } from '@discordjs/builders'
import axios from 'axios'
import config from '../Config/Client'

export default new class implements Command {
    public data = new SlashCommandBuilder()
        .setName('anime')
        .setDescription('Procure por um anime.')
        .addStringOption(option => option
            .setName('anime_name')
            .setDescription('Anime para procurar')
            .setRequired(true))
        .toJSON()
    public run = async (client: typeof Bot, interaction: UserContextMenuCommandInteraction) => {
        await interaction.deferReply()
        const keyw = interaction.options.get('anime_name')

        type animesData = {
            animeTitle: string
            type: string
            releasedDate: string
            status: string
            otherNames: string
            synopsis: string
            animeImg: string
            totalEpisodes: string
            episodesList: Array<{
                episoedId: string
                episodeNum: string
                episoedUrl: string
            }>
            genres: Array<string>
        }
        let animeId = await axios.get(`https://gogoanime.consumet.stream/search?keyw=${encodeURIComponent(keyw?.value as string)}`)
        const _data: Array<any> = animeId.data
        if(_data.length === 0) return await interaction.followUp({
            content: '🔍❓ Não achei nenhum resultado.'
        })
        console.log('Passou')
        animeId = _data[0].animeId
        const response = await axios.get(`https://gogoanime.consumet.stream/anime-details/${animeId}`)

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('add_favorite')
                    .setLabel('Adicionar aos favoritos')
                    .setEmoji({
                        name: '❤️'
                    })
                    .setStyle(ButtonStyle.Success),
            );

        const data: animesData = response.data
        const embed = new EmbedBuilder()
            .setDescription(data.synopsis)
            .setTitle(data.animeTitle)
            .addFields({
                name: '📺 Total de episodios',
                value: data.totalEpisodes
            }, {
                name: '📚 Gênero(s)',
                value: data.genres.join(', ')
            })
            .setImage(data.animeImg)
            .setColor(config.embedColor)
        const translateIntr = await interaction.followUp({
            embeds: [embed],
            components: [row]
        })

        translateIntr.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 30 * 1000,
            max: 1,
            filter: i => i.user.id === interaction.user.id
        })
            .once('collect', async (i) => {
                i.reply({
                    ephemeral: true,
                    content: 'Eu ainda não tenho um banco de dados, mas quando eu tiver você vai conseguir salvar seus animes preferidos tabóm? confia em mim ☺️.\nhttps://tenor.com/view/kiss-anime-cute-kawaii-gif-13843260'
                })
            })
            .once('end', () => {
                row.components[0].setDisabled(true)
                interaction.editReply({
                    components: [row]
                })
            })
    }
}