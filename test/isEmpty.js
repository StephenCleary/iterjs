import assert from 'assert';
import iter from '../src/iter';

describe('isEmpty', function() {
    describe('empty', function () {
        it('returns true', function () {
            const result = iter().isEmpty();
            assert.equal(result, true);
        });
    });

    describe('values in iter', function () {
        it('returns false', function () {
            const result = iter.range(0, 3).isEmpty();
            assert.equal(result, false);
        });
    });

    describe('infinite values in iter', function () {
        it('returns false', function () {
            const result = iter.range(0).isEmpty();
            assert.equal(result, false);
        });
    });
});