import {FileNotificationServices} from "@infrastructure/common/services/FileNotificationServices";
import {DiscordNotificationServices} from "@infrastructure/common/services/DiscordNotificationServices";
import {configDotenv} from "dotenv";
import * as process from "node:process";
configDotenv();
export const notificationServices = new DiscordNotificationServices(process.env.DISCORD_WEBHOOK_URL || "");