import assert from 'assert';
import iter from '../src/iter';

describe('min', function() {
    describe('empty', function () {
        it('is null', function () {
            const result = iter().min();
            assert.deepEqual(result, null);
        });
    });

    describe('one element', function () {
        it('is min', function () {
            const result = iter([3]).min();
            assert.deepEqual(result, { value: 3, index: 0 });
        });
    });

    describe('multiple elements', function () {
        it('determines min', function () {
            const result = iter([3, 5, 2, 7, 5]).min();
            assert.deepEqual(result, { value: 2, index: 2 });
        });
    });

    describe('with callback', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const result = iter([3, 5, 2, 7, 5]).min((x, y, xi, yi) => { seen.push([x, y, xi, yi]); return 0; });
            assert.deepEqual(result, { value: 3, index: 0 });
            assert.deepEqual(seen, [[3, 5, 0, 1], [3, 2, 0, 2], [3, 7, 0, 3], [3, 5, 0, 4]]);
        });
    });
});