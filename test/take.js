import assert from 'assert';
import iter from '../src/iter';

describe('take', function() {
    describe('taking some values', function () {
        it('should return only those values', function () {
            const it = iter([3, 5, 7]).take(2);
            assert.deepEqual(it.toArray(), [3, 5]);
        });
    });

    describe('taking more values than there are', function () {
        it('should return only existing values', function () {
            const it = iter([3, 5, 7]).take(5);
            assert.deepEqual(it.toArray(), [3, 5, 7]);
        });
    });

    describe('taking all values', function () {
        it('should return all values', function () {
            const it = iter([3, 5, 7]).take(3);
            assert.deepEqual(it.toArray(), [3, 5, 7]);
        });
    });

    describe('taking 0 values', function () {
        it('is empty', function () {
            const it = iter([3, 5, 7]).take(0);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('taking values from empty source', function () {
        it('is empty', function () {
            const it = iter([]).take(1);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('taking some values with function', function () {
        it('should return only those values', function () {
            const it = iter([4, 6, 7]).take(x => x % 2 === 0);
            assert.deepEqual(it.toArray(), [4, 6]);
        });
    });

    describe('once function returns false it is no longer used', function () {
        it('should return only values until the function returns false', function () {
            const it = iter([4, 6, 7, 6]).take(x => x % 2 === 0);
            assert.deepEqual(it.toArray(), [4, 6]);
        });
    });

    describe('callback', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const it = iter([4, 6, 7, 6]).take((x, i) => { seen.push([x, i]); return x % 2 === 0 });
            assert.deepEqual(it.toArray(), [4, 6]);
            assert.deepEqual(seen, [[4, 0], [6, 1], [7, 2]]);
        });
    });
});