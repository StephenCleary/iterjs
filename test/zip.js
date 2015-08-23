import assert from 'assert';
import iter from '../src/iter';

describe('iter.zip', function() {
    describe('no arguments', function () {
        it('should return an empty iter', function () {
            const it = iter.zip();

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('single array', function () {
        it('should split the array into single-element arrays', function () {
            const it = iter.zip([5, 7]);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [5]);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [7]);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('two arrays with the same length', function () {
        it('should split the arrays into two-element arrays', function () {
            const it = iter.zip([5, 7], [2, 9]);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [5, 2]);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [7, 9]);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('three arrays with the same length', function () {
        it('should split the arrays into three-element arrays', function () {
            const it = iter.zip([5, 7], [2, 9], [13, 'bob']);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [5, 2, 13]);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [7, 9, 'bob']);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('three arrays with a shorter first array', function () {
        it('should use undefined to fill the missing array positions', function () {
            const it = iter.zip([5], [2, 9], [13, 'bob']);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [5, 2, 13]);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [ , 9, 'bob']);
            assert.equal(next.value[0], undefined);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('three arrays with a shorter first and third array', function () {
        it('should use undefined to fill the missing array positions', function () {
            const it = iter.zip([5], [2, 9, 11], [13, 'bob']);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [5, 2, 13]);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [ , 9, 'bob']);
            assert.equal(next.value[0], undefined);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.deepEqual(next.value, [ , 11]);
            assert.equal(next.value[0], undefined);
            assert.equal(next.value[2], undefined);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('instance method', function () {
        it('should act just like the static method', function () {
            const it = iter([5]).zip([2, 9, 11], [13, 'bob']);
            assert.deepEqual(it.toArray(), [[5, 2, 13], [ , 9, 'bob'], [ , 11]]);
        });
    });
});