import { Injectable } from "../ioc";
import { Db, MongoClient } from "mongodb";

@Injectable()
export class DbAccessService {
  private mongoClient: MongoClient;

  //   Choose one and use it in constructor
  //   private static MONGO_URL_SERVER: string = `mongodb+srv://user:h08FMi9ubLAakYpw@cluster0.qrfka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  private static MONGO_URL_LOCAL: string = `mongodb://localhost:27017`;

  public get client(): MongoClient {
    return this.mongoClient;
  }

  public get db(): Promise<Db> {
    if (this.mongoClient.isConnected()) {
      return Promise.resolve(this.mongoClient.db("gandalf-db"));
    } else {
      return this.mongoClient.connect().then((client: MongoClient) => {
        this.mongoClient = client;
        return client.db("gandalf-db");
      });
    }
  }

  constructor() {
    this.mongoClient = new MongoClient(DbAccessService.MONGO_URL_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}
