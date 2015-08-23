import assert from 'assert';
import iter from '../src/iter';

describe('iter.findMismatch', function() {
    describe('first is longer than second', function () {
        it('should mismatch', function () {
            const result = iter.findMismatch([3, 5, 7, 5], [3, 5, 7]);
            assert.deepEqual(result, { lhsValue: 5, rhsValue: undefined, index: 3 });
        });
    });

    describe('first is shorter than second', function () {
        it('should mismatch', function () {
            const result = iter.findMismatch([3, 5], [3, 5, 7]);
            assert.deepEqual(result, { lhsValue: undefined, rhsValue: 7, index: 2 });
        });
    });

    describe('first has values less than second', function () {
        it('should mismatch', function () {
            const result = iter.findMismatch([3, 5, 6, 5], [3, 5, 7]);
            assert.deepEqual(result, { lhsValue: 6, rhsValue: 7, index: 2 });
        });
    });

    describe('first has values greater than second', function () {
        it('should mismatch', function () {
            const result = iter.findMismatch([3, 6], [3, 5, 7]);
            assert.deepEqual(result, { lhsValue: 6, rhsValue: 5, index: 1 });
        });
    });

    describe('first and second are equal', function () {
        it('should not mismatch', function () {
            const result = iter.findMismatch([3, 6], [3, 6]);
            assert.deepEqual(result, null);
        });
    });

    describe('first and second are empty', function () {
        it('should not mismatch', function () {
            const result = iter.findMismatch([], []);
            assert.deepEqual(result, null);
        });
    });

    describe('instance method', function () {
        it('should act just like the static method', function () {
            const result = iter([3, 6]).findMismatch([3, 5, 7]);
            assert.deepEqual(result, { lhsValue: 6, rhsValue: 5, index: 1 });
        });
    });

    describe('with callback', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const result = iter.findMismatch([3, 6], [3, 5], (x, y, xi, yi) => { seen.push([x, y, xi, yi]); return true; });
            assert.deepEqual(result, null);
            assert.deepEqual(seen, [[3, 3, 0, 0], [6, 5, 1, 1]]);
        });
    });
});