import assert from 'assert';
import iter from '../src/iter';

describe('toArray', function() {
    describe('empty iter', function () {
        it('should return empty array', function () {
            const result = iter().toArray();
            assert.deepEqual(result, []);
        });
    });

    describe('iter with elements', function () {
        it('should return array', function () {
            const result = iter.range(1, 6).toArray();
            assert.deepEqual(result, [1, 2, 3, 4, 5]);
        });
    });
});