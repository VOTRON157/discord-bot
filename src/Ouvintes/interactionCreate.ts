import EventsConfig from '../Sructures/Events'
import Bot from '../Sructures/Client'
import { Events, UserContextMenuCommandInteraction } from 'discord.js'
import config from '../Config/Client'
const cooldowns = new Map<string, number>()

export default new class implements EventsConfig {
    public name = Events.InteractionCreate
    public run = async (client: typeof Bot, interaction: UserContextMenuCommandInteraction) => {
        try {
            const now = Date.now()
            if (!interaction.isCommand()) return;
            const command = client.commands.find(intr => intr.data.name == interaction.commandName)
            if(!cooldowns.has(interaction.user.id)) cooldowns.set(interaction.user.id, now)
            else if(Math.abs(cooldowns.get(interaction.user.id) as number - now) <= config.cooldown * 1000) return await interaction.reply({
                content: `⏳ Espere \`\`${(config.cooldown - Math.abs(cooldowns.get(interaction.user.id) as number - now) / 1000).toPrecision(4)}\`\` segundo(s) para usar outro comando.\nhttps://tenor.com/bXrca.gif`,
                ephemeral: true
            })
            else cooldowns.delete(interaction.user.id)
            await command?.run(client, interaction)
            cooldowns.set(interaction.user.id, now)
        } catch (e: any) {
            Bot.Logger.Error(e)
            if (!interaction.replied) interaction.followUp({
                content: `Algo deu errado ao executar o comando **${interaction.commandName}**, perdão.`
            })
            else interaction.reply({
                content: `Algo deu errado ao executar o comando **${interaction.commandName}**, perdão.`
            })
        }
    }
}