import { RESTPostAPIChatInputApplicationCommandsJSONBody} from "discord.js"

export default interface CommandSetting {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody
    run: Function
    default?: CommandSetting
}