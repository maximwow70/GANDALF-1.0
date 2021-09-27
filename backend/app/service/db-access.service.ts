import { Injectable } from '../ioc';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class DbAccessService {
	private mongoClient: MongoClient;

	public get client(): MongoClient {
		return this.mongoClient;
	}

	public get db(): Promise<Db> {
		if (this.mongoClient.isConnected()) {
			return Promise.resolve(this.mongoClient.db('gandalf-db'));
		} else {
			return this.mongoClient.connect().then((client: MongoClient) => {
				this.mongoClient = client;
				return client.db('gandalf-db');
			});
		}
	}

	constructor() {
		this.mongoClient = new MongoClient(
			`mongodb+srv://user:h08FMi9ubLAakYpw@cluster0.qrfka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
	}
}
