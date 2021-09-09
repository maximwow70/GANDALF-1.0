import { Injectable } from '../ioc';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class DbAccessService {
	private mongoClient: MongoClient;

	public get client(): MongoClient {
		return this.mongoClient;
	}

	public get radarsDb(): Promise<Db> {
		if (this.mongoClient.isConnected()) {
			return Promise.resolve(this.mongoClient.db('radars-db'));
		} else {
			return this.mongoClient.connect().then((client: MongoClient) => {
				this.mongoClient = client;
				return client.db('radars-db');
			});
		}
	}

	constructor() {
		this.mongoClient = new MongoClient(
			`${config.mongo.accessUrl}`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
	}
}
