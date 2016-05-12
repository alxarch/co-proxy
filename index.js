'use strict';

const Cache = require('map-cache-ttl');
const co = require('co');
const assert = require('assert');

function coProxy(ttl) {
	const cache = new Cache(ttl);
	return (fn, ttl) => {
		if (cache.has(fn)) {
			return Promise.resolve(cache.get(fn));
		}
		else {
			assert('function' === typeof fn, 'Can only cache function results');
			return co(fn()).then(results => {
				cache.set(fn, results, ttl);
				return results;
			}).catch( err => {
				throw err;
			});
		}
	}
};

module.exports = coProxy;
