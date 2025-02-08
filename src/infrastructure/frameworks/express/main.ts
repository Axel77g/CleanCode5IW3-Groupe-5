import { boot } from "@expressApp/boot";
import { configDotenv } from "dotenv";
import * as process from "node:process";
import { server } from "./server";

configDotenv();

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    boot()
})