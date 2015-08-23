import assert from 'assert';
import iter from '../src/iter';

describe('some', function() {
    describe('true only for some', function () {
        it('should return true', function () {
            const result = iter([3, 4, 5, 6, 7]).some(x => x % 2 === 0);
            assert.deepEqual(result, true);
        });
    });

    describe('true for none', function () {
        it('returns false', function () {
            const result = iter([3, 5, 7, 9]).some(x => x % 2 === 0);
            assert.deepEqual(result, false);
        });
    });

    describe('empty source', function () {
        it('returns false', function () {
            const result = iter().some(x => x % 2 === 0);
            assert.deepEqual(result, false);
        });
    });
});