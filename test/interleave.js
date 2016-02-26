import assert from 'assert';
import iter from '../src/iter';

describe('iter.interleave', function() {
    describe('first completes before second', function () {
        it('should complete without a final second value', function () {
            const it = iter.interleave([1, 2], ['a', 'b', 'c']);
            assert.deepEqual(it.toArray(), [1, 'a', 2]);
        });
    });

    describe('first completes after second', function () {
        it('should only have values from first that can be separated by values from second', function () {
            const it = iter.interleave([1, 2, 3], ['a']);
            assert.deepEqual(it.toArray(), [1, 'a', 2]);
        });
    });

    describe('standard usage', function () {
        it('should interleave', function () {
            const it = iter.interleave([1, 2, 3, 4], iter.repeat('x'));
            assert.deepEqual(it.toArray(), [1, 'x', 2, 'x', 3, 'x', 4]);
        });
    });

    describe('empty', function () {
        it('produces empty iter', function () {
            const it = iter.interleave([], []);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('instance method', function () {
        it('should act just like the static method', function () {
            const it = iter([1, 2, 3, 4]).interleave(iter.repeat('x'));
            assert.deepEqual(it.toArray(), [1, 'x', 2, 'x', 3, 'x', 4]);
        });
    });
});