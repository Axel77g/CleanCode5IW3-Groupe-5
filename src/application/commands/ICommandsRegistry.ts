import {Command} from "@application/commands/Command";

export interface ICommandsRegistry {
    getCommands(): Promise<Map<string, Command>>;
}