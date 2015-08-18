import assert from 'assert';
import iter from '../src/iter';

describe('iter.range', function() {
    describe('standard range', function () {
        it('should return range excluding end value', function () {
            const it = iter.range(2, 5);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 2);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 3);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 4);
            next = iterator.next();
            assert.equal(next.done, true);
        });
    });

    describe('infinite range', function () {
        it('should start at the specified value', function () {
            const it = iter.range(2);

            const iterator = it[Symbol.iterator]();
            let next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 2);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 3);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 4);
            next = iterator.next();
            assert.equal(next.done, false);
            assert.equal(next.value, 5);
            for (let i = 0; i !== 100; ++i) {
                next = iterator.next();
            }
            assert.equal(next.done, false);
        });
    });
});