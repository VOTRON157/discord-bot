import Command from '../Sructures/Commands'
import Bot from '../Sructures/Client'
import { SlashCommandBuilder, UserContextMenuCommandInteraction} from 'discord.js'

export default new class implements Command {
    public data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Veja meu ping.').toJSON()
    public run = (client: typeof Bot, interaction: UserContextMenuCommandInteraction) => {
        console.log()
        interaction.reply(`🏓 Pong!\n\n🚀 Ping do websocket: \`\`${client.ws.ping}ms\`\`\n⌚ Seu comando levou cerca de \`\`${Math.abs((new Date()).getMilliseconds() - interaction.createdAt.getMilliseconds())}ms\`\` para ser respondido`)
    }
}