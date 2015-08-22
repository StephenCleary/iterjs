import assert from 'assert';
import iter from '../src/iter';

describe('do', function() {
    describe('do applied to values', function () {
        it('is executed for each value', function () {
            const result = [];
            const it = iter([3, 5, 7]).do(x => {
                result.push(x);
                return x * 2; // ignored
            });
            assert.deepEqual(it.toArray(), [3, 5, 7]);
            assert.deepEqual(result, [3, 5, 7]);
        });
    });

    describe('empty source', function () {
        it('is not executed', function () {
            const it = iter().do(x => { throw new Error(); });
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('do function with index', function () {
        it('is passed the item and index', function () {
            const result = [];
            const it = iter([3, 5, 7]).do((x, i) => {
                result.push([x, i]);
                return x * 2; // ignored
            });
            assert.deepEqual(it.toArray(), [3, 5, 7]);
            assert.deepEqual(result, [[3, 0], [5, 1], [7, 2]]);
        });
    });
});