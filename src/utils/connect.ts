import config from 'config';
import mongoose from 'mongoose';
import log from './logger';

async function connect() {
    const dbUri = config.get<string>("dbUri");
    try{
        await mongoose.connect(dbUri);
        log.info("connected to mongo db!");
    } catch(e) {
        log.error("Error in connecting to mongodb: ", e);
        process.exit(1);
    }
} 

export default connect;