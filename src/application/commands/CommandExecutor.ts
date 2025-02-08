import * as process from "node:process";
import {ICommandsRegistry} from "@application/commands/ICommandsRegistry";

function argsParser(args: string[]): string[] {
    return args.slice(2);
}

export async function executor(commandRegistry : ICommandsRegistry){
    const commandArgs = argsParser(process.argv);
    const commandName = commandArgs[0];
    const commands  = await commandRegistry.getCommands();
    const command = commands.get(commandName);
    if(command){
        console.log(`\x1b[44;1;37m RUN \x1b[0m ${commandName}`);
        await command.execute();
        console.log(`\x1b[42;1;37m DONE \x1b[0m ${commandName}`);
        process.exit(0);
    }else {
        console.error(`\x1b[41;1;37m ERROR \x1b[0m Command ${commandName} not found`);
        process.exit(1);
    }
}

