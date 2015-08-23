import assert from 'assert';
import iter from '../src/iter';

describe('filterConsecutiveDuplicates', function() {
    describe('all values are identical', function () {
        it('should return only one value', function () {
            const it = iter([3, 3, 3, 3, 3]).filterConsecutiveDuplicates();
            assert.deepEqual(it.toArray(), [3]);
        });
    });

    describe('different values', function () {
        it('should return one representative value of each', function () {
            const it = iter([3, 3, 5, 5, 5]).filterConsecutiveDuplicates();
            assert.deepEqual(it.toArray(), [3, 5]);
        });
    });

    describe('repeated non-consecutive values', function () {
        it('treats the repeated values as new values', function () {
            const it = iter([2, 2, 4, 4, 2, 4]).filterConsecutiveDuplicates();
            assert.deepEqual(it.toArray(), [2, 4, 2, 4]);
        });
    });

    describe('empty source', function () {
        it('is empty', function () {
            const it = iter().filterConsecutiveDuplicates();
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('callback', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const it = iter([3, 3, 5, 5, 5]).filterConsecutiveDuplicates((x, y, xi, yi) => { seen.push([x, y, xi, yi]); return x === y; });
            assert.deepEqual(it.toArray(), [3, 5]);
            assert.deepEqual(seen, [[3, 3, 0, 1], [3, 5, 0, 2], [5, 5, 2, 3], [5, 5, 2, 4]]);
        });
    });
});