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

    describe('with callback', function () {
        it('callback gets values and indexes', function () {
            const names = ['firstName', 'lastName', 'age'];
            const seenValues = [];
            const seenNames = [];
            const result = iter.values('Bob', 'Richardson', 99).toObject((x, i) => { seenNames.push([x, i]); return names[i]; },
                (x, i) => { seenValues.push([x, i]); return x; });
            assert.deepEqual(result, { firstName: 'Bob', lastName: 'Richardson', age: 99 });
            assert.deepEqual(seenValues, [['Bob', 0], ['Richardson', 1], [99, 2]]);
            assert.deepEqual(seenNames, [['Bob', 0], ['Richardson', 1], [99, 2]]);
        });
    });
});