import assert from 'assert';
import iter from '../src/iter';

describe('minmax', function() {
    describe('empty', function () {
        it('is null', function () {
            const result = iter().minmax();
            assert.deepEqual(result, null);
        });
    });

    describe('one element', function () {
        it('is both max and min', function () {
            const result = iter([3]).minmax();
            assert.deepEqual(result, { min: { value: 3, index: 0 }, max: { value: 3, index: 0 } });
        });
    });

    describe('multiple elements', function () {
        it('determines min and max', function () {
            const result = iter([3, 5, 2, 7, 5]).minmax();
            assert.deepEqual(result, { min: { value: 2, index: 2 }, max: { value: 7, index: 3 } });
        });
    });
});