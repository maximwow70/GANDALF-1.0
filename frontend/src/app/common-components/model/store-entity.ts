import { Observable } from 'rxjs';
import { DownloadableEntity } from './downloadable-entity';
import { EntityStatus } from './entity-status';
import { map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export class StoreEntity<T> {
	public value$: Observable<T>;
	public status$: Observable<EntityStatus>;

	private entity$: BehaviorSubject<DownloadableEntity<T>>;

	constructor(initialValue: T | null) {
		this.entity$ = new BehaviorSubject<DownloadableEntity<T>>({
			value: initialValue as T,
			status: EntityStatus.Init,
			errors: null,
		});

		this.value$ = this.entity$.pipe(
			map((entity: DownloadableEntity<T>) => {
				return entity.value;
			})
		);

		this.status$ = this.entity$.pipe(
			distinctUntilChanged(),
			map((entity: DownloadableEntity<T>) => {
				return entity.status;
			})
		);
	}

	public get errors(): any {
		return this.entity$.value.errors;
	}

	public get value(): T {
		return this.entity$.value.value;
	}

	public setValue(value: T): void {
		const updatedEntity: DownloadableEntity<T> = {
			...this.entity$.value,
			value: value,
		};

		this.entity$.next(updatedEntity);
	}

	public setStatus(status: EntityStatus): void {
		const updatedEntity: DownloadableEntity<T> = {
			...this.entity$.value,
			status: status,
		};

		this.entity$.next(updatedEntity);
	}

	public setErrors(errors: any): void {
		const updatedEntity: DownloadableEntity<T> = {
			...this.entity$.value,
			errors: errors,
		};

		this.entity$.next(updatedEntity);
	}

	public setEntity(entity: DownloadableEntity<T>) {
		this.entity$.next(entity);
	}
}
