import assert from 'assert';
import iter from '../src/iter';

describe('buffer', function() {
    describe('empty', function () {
        it('is empty', function () {
            const it = iter().buffer(2);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('single element with 2-element buffer', function () {
        it('returns a single 1-element buffer', function () {
            const it = iter([1]).buffer(2);
            assert.deepEqual(it.toArray(), [[1]]);
        });
    });

    describe('two elements with 2-element buffer', function () {
        it('returns a single 2-element buffer', function () {
            const it = iter([1, 2]).buffer(2);
            assert.deepEqual(it.toArray(), [[1, 2]]);
        });
    });

    describe('elements that fit into 3-element buffer', function () {
        it('returns buffers', function () {
            const it = iter([1, 2, 3, 1, 2, 3, 2, 3, 4]).buffer(3);
            assert.deepEqual(it.toArray(), [[1, 2, 3], [1, 2, 3], [2, 3, 4]]);
        });
    });

    describe('elements that don\'t fit into 3-element buffer', function () {
        it('returns the extras in their own buffer', function () {
            const it = iter([1, 2, 3, 1, 2, 3, 2, 3, 4, 5, 6]).buffer(3);
            assert.deepEqual(it.toArray(), [[1, 2, 3], [1, 2, 3], [2, 3, 4], [5, 6]]);
        });
    });

    describe('multiple elements with 1-element buffer', function () {
        it('returns windows', function () {
            const it = iter([1, 2, 3, 1, 2, 3, 2, 3, 4]).buffer(1);
            assert.deepEqual(it.toArray(), [[1], [2], [3], [1], [2], [3], [2], [3], [4]]);
        });
    });
});