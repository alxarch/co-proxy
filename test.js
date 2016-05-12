'use strict';
const co = require('co');
const assert = require('assert');
const coProxy = require('.');
const get = (map, key) => Map.prototype.get.call(map, key);

describe('co-proxy', () => {
	it('Returns non expired keys', () => {
		const proxy = coProxy(10);
		let times = 0;
		const fn = () => Promise.resolve(times++) ;

		proxy(fn).then( result => {
			assert.equal(result, 0);
			return proxy(fn);
		})
		.then( result => {
			assert.equal(result, 0);
			return new Promise( resolve => setTimeout(resolve, 20));
		})
		.then( () => {
			return proxy(fn);
		})
		.then( result => {
			assert.equal(result, 1);
		});

	});
});
