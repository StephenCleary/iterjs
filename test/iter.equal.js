import assert from 'assert';
import iter from '../src/iter';

describe('iter.equal', function() {
    describe('first is longer than second', function () {
        it('should return false', function () {
            const result = iter.equal([3, 5, 7, 5], [3, 5, 7]);
            assert.equal(result, false);
        });
    });

    describe('first is shorter than second', function () {
        it('should return false', function () {
            const result = iter.equal([3, 5], [3, 5, 7]);
            assert.equal(result, false);
        });
    });

    describe('first has values less than second', function () {
        it('should return false', function () {
            const result = iter.equal([3, 5, 6, 5], [3, 5, 7]);
            assert.equal(result, false);
        });
    });

    describe('first has values greater than second', function () {
        it('should return false', function () {
            const result = iter.equal([3, 6], [3, 5, 7]);
            assert.equal(result, false);
        });
    });

    describe('first and second are equal', function () {
        it('should return true', function () {
            const result = iter.equal([3, 6], [3, 6]);
            assert.equal(result, true);
        });
    });

    describe('first and second are empty', function () {
        it('should return true', function () {
            const result = iter.equal([], []);
            assert.equal(result, true);
        });
    });

    describe('instance method', function () {
        it('should act just like the static method', function () {
            const result = iter([3, 6]).equal([3, 5, 7]);
            assert.deepEqual(result, false);
        });
    });

    describe('with callback', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const result = iter.equal([3, 6], [3, 5], (x, y, xi, yi) => { seen.push([x, y, xi, yi]); return true; });
            assert.deepEqual(result, true);
            assert.deepEqual(seen, [[3, 3, 0, 0], [6, 5, 1, 1]]);
        });
    });
});