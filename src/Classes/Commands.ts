import { SlashCommandBuilder } from "discord.js"

export default interface CommandSetting {
    data: SlashCommandBuilder
    run: Function;
}