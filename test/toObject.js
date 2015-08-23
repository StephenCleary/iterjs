import assert from 'assert';
import iter from '../src/iter';

describe('toObject', function() {
    describe('empty iter', function () {
        it('should return empty object', function () {
            const result = iter().toObject();
            assert.deepEqual(result, {});
        });
    });

    describe('iter with elements', function () {
        it('should return object', function () {
            const names = ['firstName', 'lastName', 'age'];
            const result = iter.values('Bob', 'Richardson', 99).toObject((_, i) => names[i]);
            assert.deepEqual(result, { firstName: 'Bob', lastName: 'Richardson', age: 99 });
        });
    });
});