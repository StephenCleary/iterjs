import assert from 'assert';
import iter from '../src/iter';

describe('toMap', function() {
    describe('empty iter', function () {
        it('should return empty map', function () {
            const result = iter().toMap();
            for (let [key, value] of result) {
                throw new Error();
            }
        });
    });

    describe('iter with elements', function () {
        it('should return map', function () {
            const names = ['firstName', 'lastName', 'age']
            const map = iter.values('Bob', 'Richardson', 99).toMap((_, i) => names[i]);
            const result = [];
            for (let [key, value] of map) {
                result.push([key, value]);
            }
            assert.deepEqual(result, [['firstName', 'Bob'], ['lastName', 'Richardson'], ['age', 99]]);
        });
    });
});