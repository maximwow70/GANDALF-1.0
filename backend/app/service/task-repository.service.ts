import { TaskEntity } from "app/model/task-entity";
import { Db } from "mongodb";
import { Inject, Injectable } from "../ioc";
import { DbAccessService } from "./db-access.service";

@Injectable()
export class TaskRepositoryService {
    @Inject() public dbAccessService!: DbAccessService;

	public readonly collection: string = 'tasks';

	public async getTaskById(uid: string): Promise<TaskEntity> {
		const db: Db = await this.dbAccessService.db;
		return db.collection(this.collection).findOne({
			uid: { $eq: uid },
		});
	}

	public async getAllTasks(): Promise<TaskEntity[]> {
		const db: Db = await this.dbAccessService.db;
		return db.collection(this.collection).find({}).toArray();
	}

	public async createTask(task: TaskEntity): Promise<TaskEntity> {
		const db: Db = await this.dbAccessService.db;
		return db
			.collection(this.collection)
			.insertOne(task)
			.then(() => task);
	}

	public async removeTask(uid: string): Promise<string> {
		const db: Db = await this.dbAccessService.db;
		return db
			.collection(this.collection)
			.findOneAndDelete({
				uid: { $eq: uid },
			})
			.then(() => uid);
	}

	public async updateTask(task: TaskEntity): Promise<TaskEntity> {
		const db: Db = await this.dbAccessService.db;
		return db
			.collection(this.collection)
			.findOneAndReplace(
				{
					uid: { $eq: task.uid },
				},
				task
			)
			.then(() => task);
	}
}
