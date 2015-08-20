import assert from 'assert';
import iter from '../src/iter';

describe('iter.repeat', function() {
    describe('standard usage', function () {
        it('should repeat the value the specified number of times', function () {
            const it = iter.repeat(5, 2);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 5);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 5);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('without count', function () {
        it('should repeat the value indefinitely', function () {
            const it = iter.repeat(13);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 13);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 13);
            for (let i = 0; i != 101; ++i) {
                next = iterator.next();
            }
            assert.equal(next.value, 13);
            assert.equal(next.done, false);
        });
    });

    describe('when count is 1', function () {
        it('should contain a single value', function () {
            const it = iter.repeat('x', 1);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 'x');
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('when count is 0', function () {
        it('should contain a single value', function () {
            const it = iter.repeat('x', 0);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, true);
        });
    });
});