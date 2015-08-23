import assert from 'assert';
import iter from '../src/iter';

describe('first', function() {
    describe('empty', function () {
        it('returns null', function () {
            const result = iter().first();
            assert.deepEqual(result, null);
        });
    });

    describe('values in iter', function () {
        it('returns first value', function () {
            const result = iter.range(1, 3).first();
            assert.deepEqual(result, { value: 1, index: 0 });
        });
    });

    describe('infinite values in iter', function () {
        it('returns first value', function () {
            const result = iter.range(2).first();
            assert.deepEqual(result, { value: 2, index: 0 });
        });
    });
});