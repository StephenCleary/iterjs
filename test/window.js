import assert from 'assert';
import iter from '../src/iter';

describe('window', function() {
    describe('empty', function () {
        it('is empty', function () {
            const it = iter().window(2);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('single element with 2-element window', function () {
        it('is empty', function () {
            const it = iter([1]).window(2);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('two elements with 2-element window', function () {
        it('returns a single 2-element window', function () {
            const it = iter([1, 2]).window(2);
            assert.deepEqual(it.toArray(), [[1, 2]]);
        });
    });

    describe('multiple elements with 3-element window', function () {
        it('returns windows', function () {
            const it = iter([1, 2, 3, 1, 2, 3, 2, 3, 4]).window(3);
            assert.deepEqual(it.toArray(), [[1, 2, 3], [2, 3, 1], [3, 1, 2], [1, 2, 3], [2, 3, 2], [3, 2, 3], [2, 3, 4]]);
        });
    });
});