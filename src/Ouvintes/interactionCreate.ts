import EventsConfig from '../Sructures/Events'
import Bot from '../Sructures/Client'
import { Events, UserContextMenuCommandInteraction } from 'discord.js'

export default new class implements EventsConfig {
    public name = Events.InteractionCreate
    public run = async (client: typeof Bot, interaction: UserContextMenuCommandInteraction) => {
        try {
            if (!interaction.isCommand()) return;
            const command = client.commands.find(intr => intr.data.name == interaction.commandName)
            await command?.run(client, interaction)
        } catch (e: any) {
            Bot.Logger.Error(e.message)
            if (interaction.replied) interaction.followUp({
                content: `Algo deu errado ao executar o comando **${interaction.commandName}**, perdão.`
            })
            else interaction.reply({
                content: `Algo deu errado ao executar o comando **${interaction.commandName}**, perdão.`
            })
        }
    }
}