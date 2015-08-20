import assert from 'assert';
import iter from '../src/iter';

describe('iter.equal', function() {
    describe('first is longer than second', function () {
        it('should return false', function () {
            const result = iter.equal([3, 5, 7, 5], [3, 5, 7]);
            assert.equal(result, false);
        });
    });

    describe('first is shorter than second', function () {
        it('should return false', function () {
            const result = iter.equal([3, 5], [3, 5, 7]);
            assert.equal(result, false);
        });
    });

    describe('first has values less than second', function () {
        it('should return false', function () {
            const result = iter.equal([3, 5, 6, 5], [3, 5, 7]);
            assert.equal(result, false);
        });
    });

    describe('first has values greater than second', function () {
        it('should return false', function () {
            const result = iter.equal([3, 6], [3, 5, 7]);
            assert.equal(result, false);
        });
    });

    describe('first and second are equal', function () {
        it('should return true', function () {
            const result = iter.equal([3, 6], [3, 6]);
            assert.equal(result, true);
        });
    });

    describe('first and second are empty', function () {
        it('should return true', function () {
            const result = iter.equal([], []);
            assert.equal(result, true);
        });
    });
});