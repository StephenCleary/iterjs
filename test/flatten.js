import assert from 'assert';
import iter from '../src/iter';

describe('flatten', function() {
    describe('empty sequence', function () {
        it('is empty', function () {
            const it = iter().flatten();
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('single value', function () {
        it('flattens the value', function () {
            const it = iter([[3, 7]]).flatten();
            assert.deepEqual(it.toArray(), [3, 7]);
        });
    });

    describe('multiple values', function () {
        it('flattens all values', function () {
            const it = iter([[3, 5, 7], 'bob', [4, 6]]).flatten();
            assert.deepEqual(it.toArray(), [3, 5, 7, 'b', 'o', 'b', 4, 6]);
        });
    });

    describe('nested iterables', function () {
        it('only flattens a single level', function () {
            const it = iter([[3, 7], [5, [9]]]).flatten();
            assert.deepEqual(it.toArray(), [3, 7, 5, [9]]);
        });
    });
});