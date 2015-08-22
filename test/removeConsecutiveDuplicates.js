import assert from 'assert';
import iter from '../src/iter';

describe('removeConsecutiveDuplicates', function() {
    describe('all values are identical', function () {
        it('should return only one value', function () {
            const it = iter([3, 3, 3, 3, 3]).removeConsecutiveDuplicates();
            assert.deepEqual(it.toArray(), [3]);
        });
    });

    describe('different values', function () {
        it('should return one representative value of each', function () {
            const it = iter([3, 3, 5, 5, 5]).removeConsecutiveDuplicates();
            assert.deepEqual(it.toArray(), [3, 5]);
        });
    });

    describe('repeated non-consecutive values', function () {
        it('treats the repeated values as new values', function () {
            const it = iter([2, 2, 4, 4, 2, 4]).removeConsecutiveDuplicates();
            assert.deepEqual(it.toArray(), [2, 4, 2, 4]);
        });
    });

    describe('empty source', function () {
        it('is empty', function () {
            const it = iter().removeConsecutiveDuplicates();
            assert.deepEqual(it.toArray(), []);
        });
    });
});