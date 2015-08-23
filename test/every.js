import assert from 'assert';
import iter from '../src/iter';

describe('every', function() {
    describe('true only for some', function () {
        it('should return false', function () {
            const result = iter([3, 4, 5, 6, 7]).every(x => x % 2 === 0);
            assert.deepEqual(result, false);
        });
    });

    describe('true for all', function () {
        it('returns true', function () {
            const result = iter([2, 4, 6, 8]).every(x => x % 2 === 0);
            assert.deepEqual(result, true);
        });
    });

    describe('empty source', function () {
        it('returns true', function () {
            const result = iter().every(x => x % 2 === 0);
            assert.deepEqual(result, true);
        });
    });

    describe('with callback', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const result = iter([3, 4, 5, 6]).every((x, i) => { seen.push([x, i]); return true; });
            assert.deepEqual(result, true);
            assert.deepEqual(seen, [[3, 0], [4, 1], [5, 2], [6, 3]]);
        });
    });
});