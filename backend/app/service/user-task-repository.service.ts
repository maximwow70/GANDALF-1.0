import { UserTask } from "../model/user-task";
import { Db } from "mongodb";
import { Inject, Injectable } from "../ioc";
import { DbAccessService } from "./db-access.service";

@Injectable()
export class UserTaskRepositoryService {
    @Inject() public dbAccessService!: DbAccessService;

	public readonly collection: string = 'user-tasks';

	public async getTaskById(uid: string): Promise<UserTask> {
		const db: Db = await this.dbAccessService.db;
		return db.collection(this.collection).findOne({
			uid: { $eq: uid },
		});
	}

	public async getAllTasksByUserId(userId: string): Promise<UserTask[]> {
		const db: Db = await this.dbAccessService.db;
		return db.collection(this.collection).find({
            userId: { $eq: userId }
        }).toArray();
	}

	public async createTask(task: UserTask): Promise<UserTask> {
		const db: Db = await this.dbAccessService.db;
		return db
			.collection(this.collection)
			.insertOne(task)
			.then(() => task);
	}

	public async removeTaskByTaskUid(uid: string): Promise<string> {
		const db: Db = await this.dbAccessService.db;
		return db
			.collection(this.collection)
			.deleteMany({
				taskUid: { $eq: uid },
			})
			.then(() => uid);
	}

    public async addTasksBulk(tasks: UserTask[]): Promise<UserTask[]> {
        const db: Db = await this.dbAccessService.db;
		return db
			.collection(this.collection)
			.insertMany(tasks)
			.then(() => tasks);
    }

	public async updateTask(task: UserTask): Promise<UserTask> {
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