import assert from 'assert';
import iter from '../src/iter';

describe('max', function() {
    describe('empty', function () {
        it('is null', function () {
            const result = iter().max();
            assert.deepEqual(result, null);
        });
    });

    describe('one element', function () {
        it('is max', function () {
            const result = iter([3]).max();
            assert.deepEqual(result, { value: 3, index: 0 });
        });
    });

    describe('multiple elements', function () {
        it('determines max', function () {
            const result = iter([3, 5, 2, 7, 5]).max();
            assert.deepEqual(result, { value: 7, index: 3 });
        });
    });
});