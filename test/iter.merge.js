import assert from 'assert';
import iter from '../src/iter';

describe('iter.merge', function() {
    describe('first comes before second', function () {
        it('should return first\'s values first', function () {
            const result = iter.merge([3, 5], [7, 9, 10]);
            assert.equal(result.equalTo([3, 5, 7, 9, 10]), true);
        });
    });

    describe('first comes after second', function () {
        it('should return first\'s values last', function () {
            const result = iter.merge([13, 15], [7, 9, 10]);
            assert.equal(result.equalTo([7, 9, 10, 13, 15]), true);
        });
    });

    describe('interleaved', function () {
        it('should return values in order', function () {
            const result = iter.merge([3, 15, 19], [7, 9, 10, 17]);
            assert.equal(result.equalTo([3, 7, 9, 10, 15, 17, 19]), true);
        });
    });

    describe('interleaved with duplicates', function () {
        it('preserves duplicates', function () {
            const result = iter.merge([3, 9, 15, 19], [3, 7, 9, 10, 15, 17, 19]);
            assert.equal(result.equalTo([3, 3, 7, 9, 9, 10, 15, 15, 17, 19, 19]), true);
        });
    });

    describe('empty', function () {
        it('produces empty iter', function () {
            const result = iter.merge([], []);
            assert.equal(result.equalTo([]), true);
        });
    });
});