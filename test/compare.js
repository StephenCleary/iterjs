import assert from 'assert';
import iter from '../src/iter';

describe('iter.compare', function() {
    describe('first is longer than second', function () {
        it('should return 1', function () {
            const result = iter.compare([3, 5, 7, 5], [3, 5, 7]);
            assert.equal(result, 1);
        });
    });

    describe('first is shorter than second', function () {
        it('should return -1', function () {
            const result = iter.compare([3, 5], [3, 5, 7]);
            assert.equal(result, -1);
        });
    });

    describe('first has values less than second', function () {
        it('should return -1', function () {
            const result = iter.compare([3, 5, 6, 5], [3, 5, 7]);
            assert.equal(result, -1);
        });
    });

    describe('first has values greater than second', function () {
        it('should return 1', function () {
            const result = iter.compare([3, 6], [3, 5, 7]);
            assert.equal(result, 1);
        });
    });

    describe('first and second are equal', function () {
        it('should return 0', function () {
            const result = iter.compare([3, 6], [3, 6]);
            assert.equal(result, 0);
        });
    });

    describe('first and second are empty', function () {
        it('should return 0', function () {
            const result = iter.compare([], []);
            assert.equal(result, 0);
        });
    });

    describe('instance method', function () {
        it('should act just like the static method', function () {
            const result = iter([3, 6]).compare([3, 5, 7]);
            assert.deepEqual(result, 1);
        });
    });

    describe('with callback', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const result = iter.compare([3, 6], [3, 5], (x, y, xi, yi) => { seen.push([x, y, xi, yi]); return 0; });
            assert.deepEqual(result, 0);
            assert.deepEqual(seen, [[3, 3, 0, 0], [6, 5, 1, 1]]);
        });
    });
});