import assert from 'assert';
import iter from '../src/iter';

describe('skip', function() {
    describe('skipping some values', function () {
        it('should return only later values', function () {
            const it = iter([3, 5, 7]).skip(2);
            assert.deepEqual(it.toArray(), [7]);
        });
    });

    describe('skipping more values than there are', function () {
        it('is empty', function () {
            const it = iter([3, 5, 7]).skip(5);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('skipping all values', function () {
        it('is empty', function () {
            const it = iter([3, 5, 7]).skip(3);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('skipping 0 values', function () {
        it('returns all values', function () {
            const it = iter([3, 5, 7]).skip(0);
            assert.deepEqual(it.toArray(), [3, 5, 7]);
        });
    });

    describe('skipping values from empty source', function () {
        it('is empty', function () {
            const it = iter([]).skip(1);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('skipping some values with function', function () {
        it('should return only later values', function () {
            const it = iter([4, 6, 7]).skip(x => x % 2 === 0);
            assert.deepEqual(it.toArray(), [7]);
        });
    });

    describe('once function returns false it is no longer used', function () {
        it('should return only values after the function returns false', function () {
            const it = iter([4, 6, 7, 6]).skip(x => x % 2 === 0);
            assert.deepEqual(it.toArray(), [7, 6]);
        });
    });

    describe('callback', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const it = iter([4, 6, 7, 6]).skip((x, i) => { seen.push([x, i]); return x % 2 === 0 });
            assert.deepEqual(it.toArray(), [7, 6]);
            assert.deepEqual(seen, [[4, 0], [6, 1], [7, 2]]);
        });
    });
});