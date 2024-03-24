import { MongoClient, Db, Collection } from 'mongodb';

const mongoURI = 'mongodb://root:example@mongo:27017/';
const databaseName = 'universal_blog'

class Database {
    private static instance: Database;
    private client!: MongoClient;
    public db!: Db;

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        try {
            this.client = await MongoClient.connect(mongoURI);
            this.db = this.client.db(databaseName);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw new Error('Error connecting to database');
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.client.close();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
            throw new Error('Error disconnecting from database');
        }
    }

    public async execute(dbOperation: Function, collection: string): Promise<void> {
        if (!this.db) {
            await this.connect();
        }
        const dbCollection = this.db.collection(collection);
        await dbOperation(dbCollection);
    }
}

const database = Database.getInstance();

export const insertOne = async (collection: string, object: any) => {
    await database.execute(async (dbCollection: Collection) => {
        await dbCollection.insertOne(object);
    }, collection);
}