import {MongoClient} from "mongodb";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, {
    auth:{
        username:"root",
        password:"root"
    }
});

export default client;

