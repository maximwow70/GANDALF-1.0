import { EntityStatus } from './entity-status';

export interface DownloadableEntity<T> {
	value: T;
	status: EntityStatus;
	errors: any;
}
