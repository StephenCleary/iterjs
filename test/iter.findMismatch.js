import assert from 'assert';
import iter from '../src/iter';

describe('iter.findMismatch', function() {
    describe('first is longer than second', function () {
        it('should mismatch', function () {
            const result = iter.findMismatch([3, 5, 7, 5], [3, 5, 7]);
            assert.deepEqual(result, [5, undefined, 3]);
        });
    });

    describe('first is shorter than second', function () {
        it('should mismatch', function () {
            const result = iter.findMismatch([3, 5], [3, 5, 7]);
            assert.deepEqual(result, [undefined, 7, 2]);
        });
    });

    describe('first has values less than second', function () {
        it('should mismatch', function () {
            const result = iter.findMismatch([3, 5, 6, 5], [3, 5, 7]);
            assert.deepEqual(result, [6, 7, 2]);
        });
    });

    describe('first has values greater than second', function () {
        it('should mismatch', function () {
            const result = iter.findMismatch([3, 6], [3, 5, 7]);
            assert.deepEqual(result, [6, 5, 1]);
        });
    });

    describe('first and second are equal', function () {
        it('should not mismatch', function () {
            const result = iter.findMismatch([3, 6], [3, 6]);
            assert.deepEqual(result, [undefined, undefined, -1]);
        });
    });

    describe('first and second are empty', function () {
        it('should not mismatch', function () {
            const result = iter.findMismatch([], []);
            assert.deepEqual(result, [undefined, undefined, -1]);
        });
    });
});