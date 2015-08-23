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
});