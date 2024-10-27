import {Client, Databases, Storage, Account} from "node-appwrite"; 

//Admin Client
const createAdminClient = async () => {
    const client = new Client()
    .setEndpoint (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)             // Your project ID
    .setKey(process.env.NEXT_APPWRITE_KEY); 
    return {
        get account() {
            return new Account(client);
        },
        get Databases() {
            return new Databases(client);
        },
        get Storage() {
            return new Storage(client);
        },
    };        
};

//Session Client
const createSessionClient = async (Session) => {const client = new Client()
    .setEndpoint (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)   
    
    if (Session) {
        client.setSession(Session);
    }

    return {
        get account() {
            return new Account(client);
        },
        get Databases() {
            return new Databases(client);
        },
    };        
};

export { createAdminClient,createSessionClient } ;