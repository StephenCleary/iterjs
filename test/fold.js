import assert from 'assert';
import iter from '../src/iter';

describe('fold', function() {
    describe('empty without seed', function () {
        it('is undefined', function () {
            const result = iter().fold((x, y) => x + y);
            assert.deepEqual(result, undefined);
        });
    });

    describe('one element without seed', function () {
        it('is undefined', function () {
            const result = iter([3]).fold((x, y) => x + y);
            assert.deepEqual(result, undefined);
        });
    });

    describe('two elements without seed', function () {
        it('calculates result', function () {
            const result = iter([3, 5]).fold((x, y) => x + y);
            assert.deepEqual(result, 8);
        });
    });

    describe('many elements without seed', function () {
        it('calculates result', function () {
            const result = iter([3, 5, 1, 2, 2, 1]).fold((x, y) => x + y);
            assert.deepEqual(result, 14);
        });
    });

    describe('empty with seed', function () {
        it('is undefined', function () {
            const result = iter().fold((x, y) => x + y, 2);
            assert.deepEqual(result, undefined);
        });
    });

    describe('one element with seed', function () {
        it('calculates result', function () {
            const result = iter([3]).fold((x, y) => x + y, 2);
            assert.deepEqual(result, 5);
        });
    });

    describe('two elements with seed', function () {
        it('calculates result', function () {
            const result = iter([3, 5]).fold((x, y) => x + y, 2);
            assert.deepEqual(result, 10);
        });
    });

    describe('many elements with seed', function () {
        it('calculates result', function () {
            const result = iter([3, 5, 1, 2, 2, 1]).fold((x, y) => x + y, 2);
            assert.deepEqual(result, 16);
        });
    });

    describe('callback without seed', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const result = iter([3, 5, 7]).fold((x, y, i) => { seen.push([x, y, i]); return x + y; });
            assert.deepEqual(result, 15);
            assert.deepEqual(seen, [[3, 5, 1], [8, 7, 2]]);
        });
    });

    describe('callback with seed', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const result = iter([3, 5, 7]).fold((x, y, i) => { seen.push([x, y, i]); return x + y; }, 2);
            assert.deepEqual(result, 17);
            assert.deepEqual(seen, [[2, 3, 0], [5, 5, 1], [10, 7, 2]]);
        });
    });
});