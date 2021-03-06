import assert from 'assert';
import iter from '../src/iter';

describe('find', function() {
    describe('empty', function () {
        it('returns null', function () {
            const result = iter().find();
            assert.deepEqual(result, null);
        });
    });

    describe('all values match', function () {
        it('returns first value', function () {
            const result = iter.range(1, 3).find(x => true);
            assert.deepEqual(result, { value: 1, index: 0 });
        });
    });

    describe('only certain values match', function () {
        it('returns first matching value', function () {
            const result = iter.range(3, 10).find(x => x >= 7);
            assert.deepEqual(result, { value: 7, index: 4 });
        });
    });

    describe('no values match', function () {
        it('returns null', function () {
            const result = iter.range(2, 10).find(x => false);
            assert.deepEqual(result, null);
        });
    });

    describe('callback', function () {
        it('gets values and indexes', function () {
            const seen = [];
            const result = iter.range(5, 8).find((x, i) => { seen.push([x, i]); return false; });
            assert.deepEqual(result, null);
            assert.deepEqual(seen, [[5, 0], [6, 1], [7, 2]]);
        });
    });
});