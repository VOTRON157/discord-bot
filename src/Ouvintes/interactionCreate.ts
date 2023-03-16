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
        } catch (e) {
            interaction.followUp({
                ephemeral: true,
                content: `Ocorreu um erro durante a execução do comando "${interaction.commandName}", perdão.`
            })
        }
    }
}