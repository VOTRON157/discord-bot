import EventsConfig from '../Sructures/Events'
import Bot from '../Sructures/Bot'
import { Events, UserContextMenuCommandInteraction } from 'discord.js'

export default new class implements EventsConfig {
    public name = Events.InteractionCreate
    public run = (client: typeof Bot, interaction: UserContextMenuCommandInteraction ) => {
        const command = client.commands.find(intr => intr.data.name == interaction.commandName)
        command?.run(client, interaction)
    }
}