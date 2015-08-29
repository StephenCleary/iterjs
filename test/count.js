import assert from 'assert';
import iter from '../src/iter';

describe('count', function() {
    describe('empty', function () {
        it('returns 0', function () {
            const result = iter().count();
            assert.equal(result, 0);
        });
    });

    describe('values in iter', function () {
        it('returns number of values', function () {
            const result = iter.range(0, 3).count();
            assert.equal(result, 3);
        });
    });
});