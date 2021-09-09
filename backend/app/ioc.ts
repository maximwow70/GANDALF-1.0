import { Inject as _Inject, Singleton } from 'typescript-ioc';

/* eslint-disable */
export function Injectable(): (target: Function) => void {
	return function (target: Function): void {
		Singleton(target);
	};
}

export const Inject = () => _Inject;
/* eslint-disable */
