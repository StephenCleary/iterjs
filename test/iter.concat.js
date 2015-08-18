import assert from 'assert';
import iter from '../src/iter';

describe('iter.concat', function() {
    describe('no arguments', function () {
        it('should return an empty iter', function () {
            const it = iter.concat();

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('single array', function () {
        it('should enumerate the array', function () {
            const it = iter.concat([5, 7]);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 5);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 7);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('two arrays', function () {
        it('should concatenate the arrays', function () {
            const it = iter.concat([5, 7], [2, 9]);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 5);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 7);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 2);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 9);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('three arrays', function () {
        it('should concatenate the arrays', function () {
            const it = iter.concat([5, 7], [2, 9], [13, 'bob']);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 5);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 7);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 2);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 9);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 13);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 'bob');
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });
});