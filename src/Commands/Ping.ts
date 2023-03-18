import Command from '../Sructures/Commands'
import Bot from '../Sructures/Client'
import { SlashCommandBuilder, UserContextMenuCommandInteraction} from 'discord.js'

export default new class implements Command {
    public data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('⭐ Diversos ➝ Veja meu ping.').toJSON()
    public run = (client: typeof Bot, interaction: UserContextMenuCommandInteraction) => {
        interaction.reply(`🏓 Pong!\n\n🚀 Ping do websocket: \`\`${client.ws.ping}ms\`\`\n⌚ Seu comando levou cerca de \`\`${Math.abs((new Date()).getMilliseconds() - interaction.createdAt.getMilliseconds())}ms\`\` para ser respondido`)
    }
}