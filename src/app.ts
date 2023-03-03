import expresss from "express";
import config from 'config';
import connect from "./utils/connect";
import log from "./utils/logger";
import routes from "./routes";

const PORT = config.get<number>("port");
const app = expresss();
app.use(expresss.json());
app.listen(PORT, async ()=>{
    log.info(`App is running @${PORT}`);
    await connect();
    routes(app);
})