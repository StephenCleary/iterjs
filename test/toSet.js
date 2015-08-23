import assert from 'assert';
import iter from '../src/iter';

describe('toSet', function() {
    describe('empty iter', function () {
        it('should return empty set', function () {
            const result = iter().toSet();
            for (let value of result) {
                throw new Error();
            }
        });
    });

    describe('iter with elements', function () {
        it('should return set', function () {
            const set = iter([3, 4, 5, 5, 6, 3, 2]).toSet();
            const result = [];
            for (let value of set) {
                result.push(value);
            }
            assert.deepEqual(result, [3, 4, 5, 6, 2]);
        });
    });
});