import assert from 'assert';
import iter from '../src/iter';

describe('scan', function() {
    describe('empty without seed', function () {
        it('is empty', function () {
            const it = iter().scan((x, y) => x + y);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('one element without seed', function () {
        it('is empty', function () {
            const it = iter([3]).scan((x, y) => x + y);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('two elements without seed', function () {
        it('has one result', function () {
            const it = iter([3, 5]).scan((x, y) => x + y);
            assert.deepEqual(it.toArray(), [8]);
        });
    });

    describe('many elements without seed', function () {
        it('has n-1 results', function () {
            const it = iter([3, 5, 1, 2, 2, 1]).scan((x, y) => x + y);
            assert.deepEqual(it.toArray(), [8, 9, 11, 13, 14]);
        });
    });

    describe('empty with seed', function () {
        it('is empty', function () {
            const it = iter().scan((x, y) => x + y, 2);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('one element with seed', function () {
        it('has one result', function () {
            const it = iter([3]).scan((x, y) => x + y, 2);
            assert.deepEqual(it.toArray(), [5]);
        });
    });

    describe('two elements with seed', function () {
        it('has two results', function () {
            const it = iter([3, 5]).scan((x, y) => x + y, 2);
            assert.deepEqual(it.toArray(), [5, 10]);
        });
    });

    describe('many elements with seed', function () {
        it('has n results', function () {
            const it = iter([3, 5, 1, 2, 2, 1]).scan((x, y) => x + y, 2);
            assert.deepEqual(it.toArray(), [5, 10, 11, 13, 15, 16]);
        });
    });
});