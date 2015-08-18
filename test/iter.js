import assert from 'assert';
import iter from '../src/iter';

describe('iter', function() {
    describe('no arguments', function () {
        it('should return empty iterable', function () {
            const it = iter();

            assert.equal(it[Symbol.iterator]().next().done, true);
        });
    });

    describe('array argument', function () {
        it('should iterate the array', function () {
            const source = [1, 3];
            const it = iter(source);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 1);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 3);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('function argument', function () {
        it('should wrap the function', function () {
            const it = iter(function* () {
                yield 3;
                yield 5;
            });

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 3);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 5);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });
});