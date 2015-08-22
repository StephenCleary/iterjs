import assert from 'assert';
import iter from '../src/iter';

describe('iter.setDifference', function() {
    describe('first is strict superset of second', function () {
        it('should return first\'s values not in second', function () {
            const result = iter.setDifference([1, 2, 3, 4, 5], [3, 4]);
            assert.deepEqual(result.toArray(), [1, 2, 5]);
        });
    });

    describe('first is strict subset of second', function () {
        it('is empty', function () {
            const result = iter.setDifference([1, 2], [1, 2, 3, 4]);
            assert.deepEqual(result.toArray(), []);
        });
    });

    describe('first and second are equivalent', function () {
        it('is empty', function () {
            const result = iter.setDifference([1, 2, 3], [1, 2, 3]);
            assert.deepEqual(result.toArray(), []);
        });
    });

    describe('interleaved but not overlapping', function () {
        it('should return first\'s values', function () {
            const result = iter.setDifference([2, 4, 6], [1, 3, 5]);
            assert.deepEqual(result.toArray(), [2, 4, 6]);
        });
    });

    describe('first empty', function () {
        it('is empty', function () {
            const result = iter.setDifference([], [7, 13]);
            assert.deepEqual(result.toArray(), []);
        });
    });

    describe('second empty', function () {
        it('should return first\'s values', function () {
            const result = iter.setDifference([1, 5], []);
            assert.deepEqual(result.toArray(), [1, 5]);
        });
    });

    describe('both empty', function () {
        it('is empty', function () {
            const result = iter.setDifference([], []);
            assert.deepEqual(result.toArray(), []);
        });
    });

    describe('instance method', function () {
        it('should act just like the static method', function () {
            const it = iter([13, 15]).setDifference([2, 9, 11, 13]);
            assert.deepEqual(it.toArray(), [15]);
        });
    });
});