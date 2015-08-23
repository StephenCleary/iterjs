import assert from 'assert';
import iter from '../src/iter';

describe('last', function() {
    describe('empty', function () {
        it('returns null', function () {
            const result = iter().last();
            assert.deepEqual(result, null);
        });
    });

    describe('values in iter', function () {
        it('returns last value', function () {
            const result = iter.range(1, 3).last();
            assert.deepEqual(result, { value: 2, index: 1 });
        });
    });
});