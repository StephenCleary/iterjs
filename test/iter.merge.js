import assert from 'assert';
import iter from '../src/iter';

describe('iter.merge', function() {
    describe('first comes before second', function () {
        it('should return first\'s values first', function () {
            const it = iter.merge([3, 5], [7, 9, 10]);
            assert.deepEqual(it.toArray(), [3, 5, 7, 9, 10]);
        });
    });

    describe('first comes after second', function () {
        it('should return first\'s values last', function () {
            const it = iter.merge([13, 15], [7, 9, 10]);
            assert.deepEqual(it.toArray(), [7, 9, 10, 13, 15]);
        });
    });

    describe('interleaved', function () {
        it('should return values in order', function () {
            const it = iter.merge([3, 15, 19], [7, 9, 10, 17]);
            assert.deepEqual(it.toArray(), [3, 7, 9, 10, 15, 17, 19]);
        });
    });

    describe('interleaved with duplicates', function () {
        it('preserves duplicates', function () {
            const it = iter.merge([3, 9, 15, 19], [3, 7, 9, 10, 15, 17, 19]);
            assert.deepEqual(it.toArray(), [3, 3, 7, 9, 9, 10, 15, 15, 17, 19, 19]);
        });
    });

    describe('empty', function () {
        it('produces empty iter', function () {
            const it = iter.merge([], []);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('instance method', function () {
        it('should act just like the static method', function () {
            const it = iter([13, 15]).merge([2, 9, 11, 13]);
            assert.deepEqual(it.toArray(), [2, 9, 11, 13, 13, 15]);
        });
    });

    describe('with callback', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const result = iter.merge([3, 6], [3, 5], (x, y, xi, yi) => { seen.push([x, y, xi, yi]); return 1; });
            assert.deepEqual(result.toArray(), [3, 5, 3, 6]);
            assert.deepEqual(seen, [[3, 3, 0, 0], [3, 5, 0, 1]]);
        });
    });
});