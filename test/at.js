import assert from 'assert';
import iter from '../src/iter';

describe('at', function() {
    describe('empty', function () {
        it('returns null', function () {
            const result = iter().at(0);
            assert.deepEqual(result, null);
        });
    });

    describe('index greater than value indexes', function () {
        it('returns null', function () {
            const result = iter.range(1, 3).at(2);
            assert.deepEqual(result, null);
        });
    });

    describe('index identifying a value', function () {
        it('returns matching value', function () {
            const result = iter.range(3).at(4);
            assert.deepEqual(result, { value: 7, index: 4 });
        });
    });
});