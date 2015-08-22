import assert from 'assert';
import iter from '../src/iter';

describe('for/of iteration', function() {
    describe('empty', function () {
        it('processes no values', function () {
            const it = iter();
            for (let value of it) {
                throw new Error();
            }
        });
    });

    describe('values in iter', function () {
        it('iterates values', function () {
            const it = iter.range(0, 3);
            const result = [];
            for (let value of it) {
                result.push(value);
            }
            assert.deepEqual(result, [0, 1, 2]);
        });
    });
});