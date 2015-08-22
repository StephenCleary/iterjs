import assert from 'assert';
import iter from '../src/iter';

describe('iter.setIntersection', function() {
    describe('first is strict superset of second', function () {
        it('should return second\'s values', function () {
            const result = iter.setIntersection([1, 2, 3, 4, 5], [3, 4]);
            assert.deepEqual(result.toArray(), [3, 4]);
        });
    });

    describe('first is strict subset of second', function () {
        it('should return first\'s values', function () {
            const result = iter.setIntersection([1, 2], [1, 2, 3, 4]);
            assert.deepEqual(result.toArray(), [1, 2]);
        });
    });

    describe('first and second are equivalent', function () {
        it('should return both values without duplicates', function () {
            const result = iter.setIntersection([1, 2, 3], [1, 2, 3]);
            assert.deepEqual(result.toArray(), [1, 2, 3]);
        });
    });

    describe('interleaved but not overlapping', function () {
        it('is empty', function () {
            const result = iter.setIntersection([2, 4, 6], [1, 3, 5]);
            assert.deepEqual(result.toArray(), []);
        });
    });

    describe('first empty', function () {
        it('is empty', function () {
            const result = iter.setIntersection([], [7, 13]);
            assert.deepEqual(result.toArray(), []);
        });
    });

    describe('second empty', function () {
        it('is empty', function () {
            const result = iter.setIntersection([1, 5], []);
            assert.deepEqual(result.toArray(), []);
        });
    });

    describe('both empty', function () {
        it('is empty', function () {
            const result = iter.setIntersection([], []);
            assert.deepEqual(result.toArray(), []);
        });
    });

    describe('instance method', function () {
        it('should act just like the static method', function () {
            const it = iter([13, 15]).setIntersection([2, 9, 11, 13]);
            assert.deepEqual(it.toArray(), [13]);
        });
    });
});