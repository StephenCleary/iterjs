import assert from 'assert';
import iter from '../src/iter';

describe('repeat', function() {
    describe('empty sequence repeated n times', function () {
        it('is empty', function () {
            const it = iter().repeat(3);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('non-empty sequence repeated 0 times', function () {
        it('is empty', function () {
            const it = iter([3, 7]).repeat(0);
            assert.deepEqual(it.toArray(), []);
        });
    });

    describe('sequence repeated once', function () {
        it('is the sequence', function () {
            const it = iter([3, 5, 7]).repeat(1);
            assert.deepEqual(it.toArray(), [3, 5, 7]);
        });
    });

    describe('sequence repeated', function () {
        it('repeats the sequence', function () {
            const it = iter([3, 5, 7]).repeat(2);
            assert.deepEqual(it.toArray(), [3, 5, 7, 3, 5, 7]);
        });
    });

    describe('repeated infinitely', function () {
        it('repeats infinitely', function () {
            const it = iter([3, 7]).repeat();

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 3);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 7);
            for (let i = 0; i != 101; ++i) {
                next = iterator.next();
            }
            assert.equal(next.value, 3);
            assert.equal(next.done, false);
        });
    });
});