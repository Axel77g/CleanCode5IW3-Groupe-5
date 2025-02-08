import {FileCommandsRegistry} from "@infrastructure/cli/FileCommandsRegistry";
import {executor} from "@application/commands/CommandExecutor";

function main(){
    const commandRegistry = new FileCommandsRegistry();
    return executor(commandRegistry);
}

main().then();