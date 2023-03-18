import Command from '../Sructures/Commands'
import Bot from '../Sructures/Client'
import Kitsu from '../Sructures/Kitsu'
import { UserContextMenuCommandInteraction, ButtonStyle, ComponentType } from 'discord.js'
import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } from '@discordjs/builders'
import config from '../Config/Client'
import Translator from 'nodepapago';

export default new class implements Command {
    public data = new SlashCommandBuilder()
        .setName('anime')
        .setDescription('🐉 Anime ➝ Procure por um anime.')
        .addStringOption(option => option
            .setName('anime_name')
            .setDescription('🤔 ➝ Nome do anime.')
            .setRequired(true))
        .toJSON()
    public run = async (client: typeof Bot, interaction: UserContextMenuCommandInteraction) => {
        await interaction.deferReply()
        const keyw = interaction.options.get('anime_name')
        const KistsuAPI = new Kitsu()
        const data = await KistsuAPI.findAnime(keyw?.value as string)

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('add_favorite')
                    .setLabel('Favoritar')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('translate')
                    .setLabel('Traduzir')
                    .setStyle(ButtonStyle.Primary)
            );

        const embed = new EmbedBuilder()
            .setDescription(data.attributes.synopsis)
            .setTitle('🔍 ' + data.attributes.titles.en)
            .addFields({
                name: '📺 Total de episodios',
                value: String(data.attributes.episodeCount)
            }, {
                name: '📚 Gênero(s)',
                value: data.genres.join(', ')
            },  {
                name: '🌐 Veja as informações completas aqui',
                value: `https://kitsu.io/anime/${data.id}`
            })
            .setImage(data.attributes.posterImage.large)
            .setColor(config.embedColor)
            .setFooter({
                text: 'Source: kitsu.io'
            })
            .setTimestamp()

        const translateIntr = await interaction.followUp({
            embeds: [embed],
            components: [row]
        })

        translateIntr.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 30 * 1000,
            filter: i => i.user.id === interaction.user.id
        })
            .on('collect', async (i) => {
                switch (i.customId) {
                    case 'translate':
                        try {
                        row.components[1].setDisabled(true)
                            .setLabel('Traduzindo')
                        await translateIntr.edit({
                            components: [row]
                        })
                        await i.deferUpdate()
                        let parameter = [{
                            source: 'en',
                            target: 'pt',
                            text: data.attributes.synopsis
                        }]
                        for (var j of data.genres) {
                            parameter.push({
                                target: 'pt',
                                source: 'en',
                                text: j
                            })
                        }
                        const texts = await new Translator({
                            parameter: parameter,
                            honorific: true
                        }).translate() as Array<string>

                        embed.setDescription(texts[0] + '\n\n**_`(💡 Vale lembrar: essa tradução não é original e pode conter erros.)`_**')
                            .setFields({
                                name: '📺 Total de episodios',
                                value: String(data.attributes.episodeCount)
                            }, {
                                name: '📚 Gênero(s)',
                                value: texts.slice(1).join(', ')
                            }, {
                                name: '🌐 Veja as informações completas aqui',
                                value: `https://kitsu.io/anime/${data.id}`
                            })
                        await i.editReply({
                            embeds: [embed],
                        })
                    } catch {
                        interaction.followUp({
                            content: 'Ocorreu um erro ao traduzir'
                        })
                    }
                        break;
                    case 'add_favorite':
                        row.components[0].setDisabled(true)
                        interaction.editReply({
                            components: [row]
                        })
                        i.reply({
                            ephemeral: true,
                            content: 'Eu ainda não tenho um banco de dados, mas quando eu tiver você vai conseguir salvar seus animes preferidos tabóm? confia em mim ☺️.\nhttps://tenor.com/view/kiss-anime-cute-kawaii-gif-13843260'
                        })
                        break;
                }
            })
            .on('end', () => {
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)
                interaction.editReply({
                    components: [row]
                })
            })
    }
}