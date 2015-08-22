import assert from 'assert';
import iter from '../src/iter';

describe('skip', function() {
    describe('filter some values', function () {
        it('should return only unfiltered values', function () {
            const it = iter([3, 4, 5, 6, 7]).filter(x => x % 2 === 0);
            assert.deepEqual(it.toArray(), [4, 6]);
        });
    });

    describe('filtering all values out', function () {
        it('is empty', function () {
            const it = iter([3, 5, 7]).filter(x => x % 2 === 0);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('filtering no values out', function () {
        it('returns all values', function () {
            const it = iter([2, 4, 6, 8]).filter(x => x % 2 === 0);
            assert.deepEqual(it.toArray(), [2, 4, 6, 8]);
        });
    });

    describe('filter values from empty source', function () {
        it('is empty', function () {
            const it = iter().filter(x => x % 2 === 0);
            assert.deepEqual(it.toArray(), []);
        });
    });
});