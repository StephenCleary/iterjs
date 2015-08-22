import assert from 'assert';
import iter from '../src/iter';

describe('map', function() {
    describe('map applied to values', function () {
        it('applies transformation to values', function () {
            const it = iter([3, 5, 7]).map(x => x * 2);
            assert.deepEqual(it.toArray(), [6, 10, 14]);
        });
    });

    describe('empty source', function () {
        it('is empty', function () {
            const it = iter().map(x => x * 2);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('map function with index', function () {
        it('is passed the item and index', function () {
            const it = iter([3, 5, 7]).map((x, i) => [x, i]);
            assert.deepEqual(it.toArray(), [[3, 0], [5, 1], [7, 2]]);
        });
    });
});