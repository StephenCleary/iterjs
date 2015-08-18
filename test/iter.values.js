import assert from 'assert';
import iter from '../src/iter';

describe('iter.values', function() {
    describe('no arguments', function () {
        it('should return empty iterable', function () {
            const it = iter.values();

            assert.equal(it[Symbol.iterator]().next().done, true);
        });
    });

    describe('array argument', function () {
        it('should yield the array', function () {
            const source = [1, 3];
            const it = iter.values(source);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, source);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('multiple arguments', function () {
        it('should iterate the arguments', function () {
            const it = iter.values(2, 3);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 2);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 3);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });
});