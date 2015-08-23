import assert from 'assert';
import iter from '../src/iter';

describe('forEach', function() {
    describe('empty', function () {
        it('processes no values', function () {
            iter().forEach(x => { throw new Error(); });
        });
    });

    describe('values in iter', function () {
        it('iterates values', function () {
            const result = [];
            iter.range(0, 3).forEach(x => result.push(x));
            assert.deepEqual(result, [0, 1, 2]);
        });
    });
});