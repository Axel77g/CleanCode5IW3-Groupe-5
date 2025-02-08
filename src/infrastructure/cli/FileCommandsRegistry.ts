import {Command} from "@application/commands/Command";
import {ICommandsRegistry} from "@application/commands/ICommandsRegistry";
import fs from "fs";
import path from "node:path";

export class FileCommandsRegistry implements ICommandsRegistry {
    async getCommands(): Promise<Map<string, Command>> {
        try{
            const dirname = path.resolve(__dirname, "commands");
            const files = fs.readdirSync(dirname);
            const commands = new Map<string, Command>();

            for (const file of files) {
                if (file.endsWith(".ts")) {
                    const commandModule = await import(`${dirname}/${file}`);
                    const commandClass = Object.values(commandModule)[0] as { new (): Command };
                    const instance = new commandClass();
                    commands.set(instance.name, instance);
                }
            }

            return commands;
        }catch (e){
            console.warn(e);
            return new Map<string, Command>();
        }
    }
}