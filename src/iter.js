/* Enter the world of iter */

/**
 * Creates an iter from an iterable object or generator function. If no argument is passed, creates an empty iter. This function can also be used to extend objects; if it is provided a "this" value, it will extend that object rather than creating a new iter.
 * @param {(Object|GeneratorFunction)} [fnOrObject] If undefined, the returned iter is empty. If an iterable object, the returned iter is a wrapper around that iterable. If a generator function, the returned iter is a wrapper around that function.
 * @example
 * const it = iter([3, 5, 7]);
 * // 'it' contains: 3, 5, 7
 * @example
 * const it = iter(function *() {
 *   yield 13;
 *   yield 17;
 * });
 * // 'it' contains: 13, 17
 * @returns {iter_type}
 */
function iter(fnOrObject = []) {
    const result = this || Object.create(iter.prototype);
    if (typeof fnOrObject === 'function') {
        result[Symbol.iterator] = fnOrObject;
    } else {
        result[Symbol.iterator] = () => fnOrObject[Symbol.iterator]();
    }
    return result;
}

/**
 * Creates an iter that iterates a series of values.
 * @param {...*} items The values to iterate over. If no values are passed to this function, then the returned iter is empty.
 * @example
 * const it = iter.values(3, 5, 7);
 * // 'it' contains: 3, 5, 7
 * @returns {iter_type}
 */
iter.values = function values(...items) {
    return iter(items);
};

/**
 * Creates an iter that iterates a range of integer values.
 * @param {number} start An integer indicating the (inclusive) first value of the iter.
 * @param {number} [end] An optional integer indicating the (exclusive) end value of the iter. If not specified, the returned iter is infinite.
 * @example
 * const it = iter.range(0, 5);
 * // 'it' contains: 0, 1, 2, 3, 4
 * @example
 * const it = iter.range(4, 7);
 * // 'it' contains: 4, 5, 6
 * @example
 * const it = iter.range(3);
 * // 'it' contains: 3, 4, 5, ...
 * @returns {iter_type}
 */
iter.range = function range(start, end) {
    return iter(function *() {
        while (start !== end) {
            yield start++;
        }
    });
};

/**
 * Creates an iter that repeats a value.
 * @param {*} value The value that is repeated in the iter.
 * @param {number} [count] The number of times the value is repeated. If not specified, the returned iter repeats indefinitely. If the count is 0, the returned iter is empty.
 * @example
 * const it = iter.repeat('bob', 3);
 * // 'it' contains: 'bob', 'bob', 'bob'
 * @example
 * const it = iter.repeat('x');
 * // 'it' contains: 'x', 'x', 'x', 'x', ...
 * @returns {iter_type}
 */
iter.repeat = function repeat(value, count) {
    return iter(function *() {
        let index = 0;
        while (index++ !== count) {
            yield value;
        }
    });
};

/**
 * Creates an iter that is a concatenation of any number of iterables.
 * @param {...iterable} iterables The iterables to concatenate. If no iterables are passed to this function, then the returned iter is empty.
 * @example
 * const it = iter.concat([1, 2, 3], [4, 5]);
 * // 'it' contains: 1, 2, 3, 4, 5
 * @example
 * const it = iter.concat([1, 2], [4, 5], [3, 7]);
 * // 'it' contains: 1, 2, 4, 5, 3, 7
 * @returns {iter_type}
 */
iter.concat = function concat(...iterables) {
    return iter(function *() {
        for (let iterable of iterables) {
            yield* iterable;
        }
    });
};

/**
 * Creates an iter that combines corresponding values from any number of iterables.
 * The resulting iter will yield arrays for its values, where the element of each array is the value retrieved from the corresponding iterable passed to this function.
 * @param {...iterable} iterables The iterables to zip. If no iterables are passed to this function, then the returned iter is empty.
 * @example
 * const it = iter.zip(['a', 'b', 'c'], [1, 2, 3]);
 * // 'it' contains: ['a', 1], ['b', 2], ['c', 3]
 * @example
 * const it = iter.zip(['a', 'b'], [1, 2], [2, 4]);
 * // 'it' contains: ['a', 1, 2], ['b', 2, 4]
 * @returns {iter_type}
 */
iter.zip = function zip(...iterables) {
    return iter(function *() {
        const iterators = [];
        for (let iterable of iterables) {
            iterators.push(iterable[Symbol.iterator]());
        }
        while (true) {
            let atLeastOneNotDone = false;
            const result = [];
            for (let i = 0; i !== iterators.length; ++i) {
                const next = iterators[i].next();
                if (!next.done) {
                    result[i] = next.value;
                    atLeastOneNotDone = true;
                }
            }
            if (atLeastOneNotDone) {
                yield result;
            } else {
                break;
            }
        }
    });
};

/* Utilities */

/**
 * Performs a lexicographical comparison of two iterables. Returns -1 if the first iterable is less than the second; +1 if the first iterable is greater than the second; and 0 if both iterables are equivalent.
 * @param {iterable} lhs The first iterable to compare.
 * @param {iterable} rhs The second iterable to compare.
 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const result = iter.compare([1, 2], [1, 2]);
 * // result: 0
 * @example
 * const result = iter.compare([1, 2], [2, 2]);
 * // result: -1
 * @returns {number} Always returns 0, -1, or +1, regardless of what the comparison method returns.
 */
iter.compare = function compare(lhs, rhs, comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue)) {
    const iterL = lhs[Symbol.iterator]();
    const iterR = rhs[Symbol.iterator]();
    let index = 0;
    while (true) {
        const nextL = iterL.next();
        const nextR = iterR.next();
        if (nextL.done && nextR.done) {
            return 0;
        }
        if (nextL.done) {
            return -1;
        }
        if (nextR.done) {
            return 1;
        }
        const result = comparer(nextL.value, nextR.value, index, index);
        ++index;
        if (result < 0) {
            return -1;
        } else if (result > 0) {
            return 1;
        }
    }
};

/**
 * Determines whether two iterables are equivalent (are the same length and contain equivalent values in the same positions).
 * @param {iterable} lhs The first iterable to compare.
 * @param {iterable} rhs The second iterable to compare.
 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
 * @example
 * const result = iter.equal([1, 2], [1, 2]);
 * // result: true
 * @example
 * const result = iter.equal([1, 2], [2, 2]);
 * // result: false
 * @returns {boolean}
 */
iter.equal = function equal(lhs, rhs, equals = Object.is) {
    const iterL = lhs[Symbol.iterator]();
    const iterR = rhs[Symbol.iterator]();
    let index = 0;
    while (true) {
        const nextL = iterL.next();
        const nextR = iterR.next();
        if (nextL.done && nextR.done) {
            return true;
        }
        if (nextL.done || nextR.done) {
            return false;
        }
        const result = equals(nextL.value, nextR.value, index, index);
        ++index;
        if (!result) {
            return false;
        }
    }
};

/**
 * Finds the first mismatch between two iterables. Returns an object containing the lhs value, the rhs value, and the index of the values. If one iterable ends before the other, that iterable's value returned as "undefined". If no mismatch is found, then this function returns null.
 * @param {iterable} lhs The first iterable to compare.
 * @param {iterable} rhs The second iterable to compare.
 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
 * @example
 * const result = iter.findMismatch([1, 2], [2, 2]);
 * // result: { lhsValue: 1, rhsValue: 2, index: 0 }
 * @example
 * const result = iter.findMismatch([1, 2], [1, 2]);
 * // result: null
 * @returns {mismatch_result}
 */
iter.findMismatch = function findMismatch(lhs, rhs, equals = Object.is) {
    const iterL = lhs[Symbol.iterator]();
    const iterR = rhs[Symbol.iterator]();
    let index = 0;
    while (true) {
        const nextL = iterL.next();
        const nextR = iterR.next();
        if (nextL.done && nextR.done) {
            return null;
        }
        if (nextL.done) {
            return { lhsValue: undefined, rhsValue: nextR.value, index };
        }
        if (nextR.done) {
            return { lhsValue: nextL.value, rhsValue: undefined, index };
        }
        const result = equals(nextL.value, nextR.value, index, index);
        if (!result) {
            return { lhsValue: nextL.value, rhsValue: nextR.value, index };
        }
        ++index;
    }
};

/**
 * Merges two sorted iterables into a new sorted iter. The returned iter contains all values from both source iterables, and may contain duplicates.
 * @param {iterable} lhs The first iterable to merge.
 * @param {iterable} rhs The second iterable to merge.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const it = iter.merge([1, 3], [2, 3]);
 * // 'it' contains: 1, 2, 3, 3
 * @returns {iter_type}
 */
iter.merge = function merge(lhs, rhs, comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue)) {
    return iter(function *() {
        const iterL = lhs[Symbol.iterator]();
        const iterR = rhs[Symbol.iterator]();
        let indexL = 0;
        let indexR = 0;
        let nextL = iterL.next();
        let nextR = iterR.next();
        while (!nextL.done || !nextR.done) {
            if (nextL.done) {
                yield nextR.value;
                nextR = iterR.next();
            } else if (nextR.done) {
                yield nextL.value;
                nextL = iterL.next();
            } else {
                const compareResult = comparer(nextL.value, nextR.value, indexL, indexR);
                if (compareResult <= 0) {
                    yield nextL.value;
                    nextL = iterL.next();
                    ++indexL;
                }
                if (compareResult >= 0) {
                    yield nextR.value;
                    nextR = iterR.next();
                    ++indexR;
                }
            }
        }
    });
};

/* Set operations */

/**
 * Performs a set union of two iterables. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} lhs The first source iterable.
 * @param {iterable} rhs The second source iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const it = iter.setUnion([1, 3], [2, 3]);
 * // 'it' contains: 1, 2, 3
 * @returns {iter_type}
 */
iter.setUnion = function setUnion(lhs, rhs, comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue)) {
    return iter(function *() {
        const iterL = lhs[Symbol.iterator]();
        const iterR = rhs[Symbol.iterator]();
        let indexL = 0;
        let indexR = 0;
        let nextL = iterL.next();
        let nextR = iterR.next();
        while (!nextL.done || !nextR.done) {
            if (nextL.done) {
                yield nextR.value;
                nextR = iterR.next();
            } else if (nextR.done) {
                yield nextL.value;
                nextL = iterL.next();
            } else {
                const compareResult = comparer(nextL.value, nextR.value, indexL, indexR);
                if (compareResult < 0) {
                    yield nextL.value;
                    nextL = iterL.next();
                    ++indexL;
                } else if (compareResult > 0) {
                    yield nextR.value;
                    nextR = iterR.next();
                    ++indexR;
                } else {
                    yield nextL.value;
                    nextL = iterL.next();
                    ++indexL;
                    nextR = iterR.next();
                    ++indexR;
                }
            }
        }
    });
};

/**
 * Performs a set intersection of two iterables. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} lhs The first source iterable.
 * @param {iterable} rhs The second source iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const it = iter.setIntersection([1, 3], [2, 3]);
 * // 'it' contains: 3
 * @returns {iter_type}
 */
iter.setIntersection = function setIntersection(lhs, rhs, comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue)) {
    return iter(function *() {
        const iterL = lhs[Symbol.iterator]();
        const iterR = rhs[Symbol.iterator]();
        let indexL = 0;
        let indexR = 0;
        let nextL = iterL.next();
        let nextR = iterR.next();
        while (!nextL.done && !nextR.done) {
            const compareResult = comparer(nextL.value, nextR.value, indexL, indexR);
            if (compareResult < 0) {
                nextL = iterL.next();
                ++indexL;
            } else if (compareResult > 0) {
                nextR = iterR.next();
                ++indexR;
            } else {
                yield nextL.value;
                nextL = iterL.next();
                ++indexL;
                nextR = iterR.next();
                ++indexR;
            }
        }
    });
};

/**
 * Performs a set symmetric difference of two iterables. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} lhs The first source iterable.
 * @param {iterable} rhs The second source iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const it = iter.setSymmetricDifference([1, 3], [2, 3]);
 * // 'it' contains: 1, 2
 * @returns {iter_type}
 */
iter.setSymmetricDifference = function setSymmetricDifference(lhs, rhs, comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue)) {
    return iter(function *() {
        const iterL = lhs[Symbol.iterator]();
        const iterR = rhs[Symbol.iterator]();
        let indexL = 0;
        let indexR = 0;
        let nextL = iterL.next();
        let nextR = iterR.next();
        while (!nextL.done || !nextR.done) {
            if (nextL.done) {
                yield nextR.value;
                nextR = iterR.next();
            } else if (nextR.done) {
                yield nextL.value;
                nextL = iterL.next();
            } else {
                const compareResult = comparer(nextL.value, nextR.value, indexL, indexR);
                if (compareResult < 0) {
                    yield nextL.value;
                    nextL = iterL.next();
                    ++indexL;
                } else if (compareResult > 0) {
                    yield nextR.value;
                    nextR = iterR.next();
                    ++indexR;
                } else {
                    nextL = iterL.next();
                    ++indexL;
                    nextR = iterR.next();
                    ++indexR;
                }
            }
        }
    });
};

/**
 * Performs a set difference of two iterables, returning an iter containing only values from the first source iterable that are not in the second source iterable. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} lhs The first source iterable.
 * @param {iterable} rhs The second source iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const it = iter.setDifference([1, 3], [2, 3]);
 * // 'it' contains: 1
 * @returns {iter_type}
 */
iter.setDifference = function setDifference(lhs, rhs, comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue)) {
    return iter(function *() {
        const iterL = lhs[Symbol.iterator]();
        const iterR = rhs[Symbol.iterator]();
        let indexL = 0;
        let indexR = 0;
        let nextL = iterL.next();
        let nextR = iterR.next();
        while (!nextL.done) {
            if (nextR.done) {
                yield nextL.value;
                nextL = iterL.next();
            } else {
                const compareResult = comparer(nextL.value, nextR.value, indexL, indexR);
                if (compareResult < 0) {
                    yield nextL.value;
                    nextL = iterL.next();
                    ++indexL;
                } else if (compareResult > 0) {
                    nextR = iterR.next();
                    ++indexR;
                } else {
                    nextL = iterL.next();
                    ++indexL;
                    nextR = iterR.next();
                    ++indexR;
                }
            }
        }
    });
};

/**
 * Interleaves the values of two iterables, ending when either iterable is completed. The first and last values in the resulting iter are always from the first iterable.
 * @param {iterable} lhs The first source iterable.
 * @param {iterable} rhs The second source iterable. A common usage pattern is to pass an infinitely-repeating iter.
 * @example
 * const it = iter.interleave([1, 2, 3], ['a', 'b', 'c']);
 * // 'it' contains: 1, 'a', 2, 'b', 3
 * @example
 * const it = iter.interleave([1, 2, 3], ['a']);
 * // 'it' contains: 1, 'a', 2
 * @example
 * const it = iter.interleave([1, 2, 3], iter.repeat('a'));
 * // 'it' contains: 1, 'a', 2, 'a', 3
 * @returns {iter_type}
 */
iter.interleave = function interleave(lhs, rhs) {
    return iter(function *() {
        const iterL = lhs[Symbol.iterator]();
        const iterR = rhs[Symbol.iterator]();
        let nextL = iterL.next();
        if (nextL.done) {
            return;
        }
        while (true) {
            yield nextL.value;
            nextL = iterL.next();
            if (nextL.done) {
                break;
            }
            const nextR = iterR.next();
            if (nextR.done) {
                break;
            }
            yield nextR.value;
        }
    });
};

/* Enjoy the world of iter */

/**
 * Applies a transformation function to each value in an iter. The returned iter contains the transformed values.
 * @param {transform} transform The transformation function to apply.
 * @example
 * const it = iter([1, 2, 3, 4]).map(x => x * 2);
 * // 'it' contains: 2, 4, 6, 8
 * @returns {iter_type}
 */
iter.prototype.map = function map(transform) {
    const self = this;
    return iter(function *() {
        let index = 0;
        for (let item of self) {
            yield transform(item, index++);
        }
    });
};

/**
 * Filters an iter based on a predicate function. The returned iter contains only values for which the predicate function returns true.
 * @param {predicate} predicate The predicate function used to determine whether each value is in the returned iter.
 * @example
 * const it = iter([1, 2, 3, 4]).filter(x => x % 2 === 0);
 * // 'it' contains: 2, 4
 * @returns {iter_type}
 */
iter.prototype.filter = function filter(predicate) {
    const self = this;
    return iter(function *() {
        let index = 0;
        for (let item of self) {
            if (predicate(item, index++)) {
                yield item;
            }
        }
    });
};

/**
 * Takes a number of values from this iter, and discards all later values.
 * @param {number|predicate} numberOrPredicate If a number, then this is the number of values to take from the iter. If a predicate, then values are taken from the iter as long as the predicate returns true. As soon as it returns false, the returned iter ends.
 * @example
 * const it = iter(['a', 'b', 'c', 'd', 'e']).take(3);
 * // 'it' contains: 'a', 'b', 'c'
 * @example
 * const it = iter(1, 2, 3, 2, 4).take(x => x < 3);
 * // 'it' contains: 1, 2
 * @returns {iter_type}
 */
iter.prototype.take = function take(numberOrPredicate) {
    const predicate = (typeof numberOrPredicate === 'number') ? (() => numberOrPredicate-- !== 0) : numberOrPredicate;
    const self = this;
    return iter(function *() {
        let index = 0;
        for (let item of self) {
            if (!predicate(item, index++)) {
                break;
            }
            yield item;
        }
    });
};

/**
 * Skips over a number of values from this iter, and then yields all later values.
 * @param {number|predicate} numberOrPredicate If a number, then this is the number of values to skip over from the iter. If a predicate, then values are skipped over from the iter as long as the predicate returns true. As soon as it returns false, the returned iter yields all later values.
 * @example
 * const it = iter(['a', 'b', 'c', 'd', 'e']).skip(3);
 * // 'it' contains: 'd', 'e'
 * @example
 * const it = iter(1, 2, 3, 2, 4).skip(x => x < 3);
 * // 'it' contains: 3, 2, 4
 * @returns {iter_type}
 */
iter.prototype.skip = function skip(numberOrPredicate) {
    const predicate = (typeof numberOrPredicate === 'number') ? (() => numberOrPredicate-- > 0) : numberOrPredicate;
    const self = this;
    return iter(function *() {
        let index = 0;
        let doneSkipping = false;
        for (let item of self) {
            if (!doneSkipping) {
                if (predicate(item, index++)) {
                    continue;
                }
                doneSkipping = true;
            }
            yield item;
        }
    });
};

/**
 * Applies a function to each value in an iter as it is iterated, and passes the value through in the returned iter.
 * @param {process} process The function to call for each value as it is iterated.
 * @example
 * const evilSideEffect = [];
 * const it = iter([1, 2, 3]).do(x => evilSideEffect.push(x));
 * // 'it' contains: 1, 2, 3
 * // evilSideEffect: []
 * const result = it.toArray();
 * // result: [1, 2, 3]
 * // evilSideEffect: [1, 2, 3]
 * @returns {iter_type}
 */
iter.prototype.do = function _do(process) {
    return this.map((item, index) => { process(item, index); return item; });
};

/**
 * Breaks an iter into buffers. The values of the returned iter are all arrays of the specified size, except for the last value which may be a smaller array containing the last few values.
 * @param {number} size The buffer size. This must be an integer greater than 0.
 * @example
 * const it = iter([1, 2, 3, 4, 5, 6]).buffer(3);
 * // 'it' contains: [1, 2, 3], [4, 5, 6]
 * @returns {iter_type}
 */
iter.prototype.buffer = function buffer(size) {
    const self = this;
    return iter(function *() {
        let result = [];
        for (let item of self) {
            result.push(item);
            if (result.length === size) {
                yield result;
                result = [];
            }
        }
        if (result.length !== 0) {
            yield result;
        }
    });
};

/**
 * Applies a sliding window over the iter. The values of the returned iter are all arrays of the specified size. The arrays are shallow-copied before they are yielded, so they can be safely mutated by consuming code.
 * @param {number} size The size of the window. This must be an integer greater than 0.
 * @example
 * const it = iter([1, 2, 3, 4, 5, 6]).window(3);
 * // 'it' contains: [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]
 * @returns {iter_type}
 */
iter.prototype.window = function window(size) {
    const self = this;
    return iter(function *() {
        const result = [];
        for (let item of self) {
            if (result.length === size) {
                result.shift();
                result.push(item);
            } else {
                result.push(item);
            }
            if (result.length === size) {
                yield result.slice();
            }
        }
    });
};

/**
 * Maps each value to an iterable, and returns an iter that contains the values from each of those iterables.
 * @param {transform} [transform] The transformation function to apply. If not specified, an identity function is used.
 * @example
 * const it = iter([[1, 2], [3, 4, 5]]).flatten();
 * // 'it' contains: 1, 2, 3, 4, 5
 * @example
 * const it = iter([2, 3, 4]).flatten(x => [x, x * 2]);
 * // 'it' contains: 2, 4, 3, 6, 4, 8
 * @returns {iter_type}
 */
iter.prototype.flatten = function flatten(transform = x => x) {
    const self = this;
    return iter(function *() {
        for (let sequence of self.map(transform)) {
            yield* sequence;
        }
    });
};

/**
 * Filters runs of consecutive duplicates out of the source iter.
 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
 * @example
 * const it = iter([1, 2, 2, 3, 2, 4, 5]).filterConsecutiveDuplicates();
 * // 'it' contains: [1, 2, 3, 2, 4, 5]
 * @returns {iter_type}
 */
iter.prototype.filterConsecutiveDuplicates = function filterConsecutiveDuplicates(equals = Object.is) {
    const self = this;
    return iter(function *() {
        let lastValue;
        let lastValueIndex = -1;
        let index = 1;
        for (let item of self) {
            if (lastValueIndex === -1) {
                lastValueIndex = 0;
                lastValue = item;
                yield lastValue;
            } else if (!equals(lastValue, item, lastValueIndex, index++)) {
                lastValueIndex = index - 1;
                lastValue = item;
                yield lastValue;
            }
        }
    });
};

/**
 * Applies a combiner/accumulator function over an iter. Returns an iter containing the values of the combination.
 * @param {combine} combine The callback used to combine values.
 * @param {*} [seed] The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter.
 * @example
 * const it = iter([1, 2, 3, 4]).scan((x, y) => x * y);
 * // 'it' contains: [2, 6, 24]
 * @example
 * const it = iter([1, 2, 3, 4]).scan((x, y) => x * y, 2);
 * // 'it' contains: [2, 4, 12, 48]
 * @returns {iter_type}
 */
iter.prototype.scan = function scan(combine, seed) {
    const self = this;
    return iter(function *() {
        let index = 0;
        let current = seed;
        for (let item of self) {
            if (index === 0 && seed === undefined) {
                current = item;
            } else {
                current = combine(current, item, index);
                yield current;
            }
            ++index;
        }
    });
};

/**
 * Concatenates this iter with any number of iterables.
 * @param {...iterable} others The additional iterables to concatenate. If no iterables are passed to this function, then the returned iter is equivalent to the source iter.
 * @example
 * const it = iter([1, 2, 3]).concat([4, 5]);
 * // 'it' contains: 1, 2, 3, 4, 5
 * @example
 * const it = iter([1, 2]).concat([4, 5], [3, 7]);
 * // 'it' contains: 1, 2, 4, 5, 3, 7
 * @returns {iter_type}
 */
iter.prototype.concat = function concat(...others) {
    return iter.concat(this, ...others);
};

/**
 * Repeats the values in this iter the specified number of times. Note that this iter is evaluated multiple times.
 * @param {number} [count] The number of times the value is repeated. If not specified, the returned iter repeats indefinitely. If the count is 0, the returned iter is empty.
 * @example
 * const it = iter(['a', 'b']).repeat(3);
 * // 'it' contains: 'a', 'b', 'a', 'b', 'a', 'b'
 * @example
 * const it = iter([1, 2]).repeat();
 * // 'it' contains: 1, 2, 1, 2, 1, 2, 1, 2, ...
 * @returns {iter_type}
 */
iter.prototype.repeat = function repeat(count) {
    return iter.repeat(this, count).flatten();
};

/**
 * Combines the values in this iter with corresponding values from any number of iterables.
 * @param {...iterable} others The other iterables to zip. If no iterables are passed to this function, then the returned iter is equivalent to the source iter.
 * @example
 * const it = iter(['a', 'b', 'c']).zip([1, 2, 3]);
 * // 'it' contains: ['a', 1], ['b', 2], ['c', 3]
 * @example
 * const it = iter(['a', 'b']).zip([1, 2], [2, 4]);
 * // 'it' contains: ['a', 1, 2], ['b', 2, 4]
 * @returns {iter_type}
 */
iter.prototype.zip = function zip(...others) {
    return iter.zip(this, ...others);
};

/**
 * Merges this sorted iter with another sorted iterable, returning a new sorted iter. The returned iter contains all values from both source iterables, and may contain duplicates.
 * @param {iterable} otherIterable The other iterable to merge.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const it = iter([1, 3]).merge([2, 3]);
 * // 'it' contains: 1, 2, 3, 3
 * @returns {iter_type}
 */
iter.prototype.merge = function merge(otherIterable, comparer) {
    return iter.merge(this, otherIterable, comparer);
};

/**
 * Performs a set union of this iter with another iterable. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} otherIterable The other iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const it = iter([1, 3]).setUnion([2, 3]);
 * // 'it' contains: 1, 2, 3
 * @returns {iter_type}
 */
iter.prototype.setUnion = function setUnion(otherIterable, comparer) {
    return iter.setUnion(this, otherIterable, comparer);
};

/**
 * Performs a set intersection of this iter with another iterable. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} otherIterable The other iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const it = iter([1, 3]).setIntersection([2, 3]);
 * // 'it' contains: 3
 * @returns {iter_type}
 */
iter.prototype.setIntersection = function setIntersection(otherIterable, comparer) {
    return iter.setIntersection(this, otherIterable, comparer);
};

/**
 * Performs a set symmetric difference of this iter with another iterable. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} otherIterable The other iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const it = iter([1, 3]).setSymmetricDifference([2, 3]);
 * // 'it' contains: 1, 2
 * @returns {iter_type}
 */
iter.prototype.setSymmetricDifference = function setSymmetricDifference(otherIterable, comparer) {
    return iter.setSymmetricDifference(this, otherIterable, comparer);
};

/**
 * Performs a set difference of this iter with another iterable, returning an iter containing only values from this iter that are not in the other iterable. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} otherIterable The other iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const it = iter([1, 3]).setDifference([2, 3]);
 * // 'it' contains: 1
 * @returns {iter_type}
 */
iter.prototype.setDifference = function setDifference(otherIterable, comparer) {
    return iter.setDifference(this, otherIterable, comparer);
};

/**
 * Interleaves the values of this iterable with another iterable, ending when either iterable is completed. The first and last values in the resulting iter are always from this iterable.
 * @param {iterable} otherIterable The other iterable. A common usage pattern is to pass an infinitely-repeating iter.
 * @example
 * const it = iter([1, 2, 3]).interleave(['a', 'b', 'c']);
 * // 'it' contains: 1, 'a', 2, 'b', 3
 * @example
 * const it = iter([1, 2, 3]).interleave(['a']);
 * // 'it' contains: 1, 'a', 2
 * @example
 * const it = iter([1, 2, 3]).interleave(iter.repeat('a'));
 * // 'it' contains: 1, 'a', 2, 'a', 3
 * @returns {iter_type}
*/
iter.prototype.interleave = function interleave(otherIterable) {
    return iter.interleave(this, otherIterable);
};

/* Leave the world of iter */

/**
 * Iterates through the values of this iter, invoking a processing function for each value.
 * @param {process} [process] The function to call for each value. If not specified, this function will still iterate through the values of this iter, causing any side effects.
 * @example
 * let result = 0;
 * iter([1, 2, 3]).forEach(x => { result += x; });
 * // result: 6
 */
iter.prototype.forEach = function forEach(process = () => {}) {
    let index = 0;
    for (let item of this) {
        process(item, index++);
    }
};

/**
 * Determines the number of values in this iter. This function will iterate through the entire iter.
 * @example
 * const result = iter([1, 2, 3]).count();
 * // result: 3
 * @returns {number}
 */
iter.prototype.count = function count() {
    let result = 0;
    for (let item of this) { // eslint-disable-line no-unused-vars
        ++result;
    }
    return result;
};

/**
 * Determines whether an iter is empty.
 * @example
 * const result = iter([1, 2, 3]).isEmpty();
 * // result: false
 * @example
 * const result = iter().isEmpty();
 * // result: true
 * @returns {boolean}
 */
iter.prototype.isEmpty = function isEmpty() {
    return this[Symbol.iterator]().next().done;
};

/**
 * Returns the first value in this iter, along with its index. If this iter is empty, this function returns null. If this iter is not empty, the returned index is always 0.
 * @example
 * const result = iter(['bob', 'sue']).first();
 * // result: { value: 'bob', index: 0 }
 * @example
 * const result = iter().first();
 * // result: null
 * @returns {find_result}
 */
iter.prototype.first = function first() {
    const next = this[Symbol.iterator]().next();
    if (!next.done) {
        return { value: next.value, index: 0 };
    } else {
        return null;
    }
};

/**
 * Returns the last value in this iter, along with its index. If this iter is empty, this function returns null.
 * @example
 * const result = iter(['bob', 'beth', 'sue']).last();
 * // result: { value: 'sue', index: 2 }
 * @example
 * const result = iter().last();
 * // result: null
 * @returns {find_result}
 */
iter.prototype.last = function last() {
    let value;
    let index = -1;
    for (let item of this) {
        value = item;
        ++index;
    }
    if (index === -1) {
        return null;
    }
    return { value, index };
};

/**
 * Returns a specified value from this iter. If this iter is empty, this function returns null.
 * @param {number} index The index of the value to return.
 * @example
 * const result = iter(['bob', 'beth', 'sue']).at(1);
 * // result: { value: 'beth', index: 1 }
 * @example
 * const result = iter(['bob', 'beth', 'sue']).at(100);
 * // result: null
 * @returns {find_result}
 */
iter.prototype.at = function at(index) {
    return this.find((_, i) => i === index);
};

/**
 * Returns the first value in this iter that satisfies a predicate, along with its index. If this iter is empty, this function returns null.
 * @param {predicate} predicate The function used to determine whether this is the value we're searching for.
 * @example
 * const result = iter(['bob', 'beth', 'sue']).find(x => x[0] === 's');
 * // result: { value: 'sue', index: 2 }
 * @example
 * const result = iter(['bob', 'beth', 'sue']).find(x => x[0] === 'x');
 * // result: null
 * @returns {find_result}
 */
iter.prototype.find = function find(predicate) {
    let index = -1;
    for (let value of this) {
        if (predicate(value, ++index)) {
            return { value, index };
        }
    }
    return null;
};

/**
 * Determines whether the specified predicate returns true for every value in this iter.
 * @param {predicate} predicate The predicate to evaluate for each value in this iter.
 * @example
 * const result = iter(['bob', 'beth', 'sue']).every(x => typeof x === 'string');
 * // result: true
 * @returns {boolean}
 */
iter.prototype.every = function every(predicate) {
    for (let item of this.map(predicate)) {
        if (!item) {
            return false;
        }
    }
    return true;
};

/**
 * Determines whether the specified predicate returns true for any value in this iter.
 * @param {predicate} predicate The predicate to evaluate for each value in this iter.
 * @example
 * const result = iter(['bob', 'beth', 'sue']).some(x => x[0] === 's');
 * // result: true
 * @returns {boolean}
 */
iter.prototype.some = function some(predicate) {
    for (let item of this.map(predicate)) {
        if (item) {
            return true;
        }
    }
    return false;
};

/**
 * Determines the minimum value in this iter. Returns the minimum value and its index. If this iter is empty, this function returns null.
 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const result = iter(['bob', 'beth', 'sue']).min();
 * // result: { value: 'beth', index: 1 }
 * @returns {find_result}
 */
iter.prototype.min = function min(comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue)) {
    let minIndex = -1;
    let minValue;
    let index = 0;
    for (let item of this) {
        if (minIndex === -1) {
            minIndex = index;
            minValue = item;
        } else if (comparer(minValue, item, minIndex, index) > 0) {
            minIndex = index;
            minValue = item;
        }
        ++index;
    }
    if (minIndex === -1) {
        return null;
    }
    return { value: minValue, index: minIndex };
};

/**
 * Determines the maximum value in this iter. Returns the maximum value and its index. If this iter is empty, this function returns null.
 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const result = iter(['bob', 'beth', 'sue']).max();
 * // result: { value: 'sue', index: 2 }
 * @returns {find_result}
 */
iter.prototype.max = function max(comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue)) {
    return this.min((lhsValue, rhsValue, lhsIndex, rhsIndex) => -comparer(lhsValue, rhsValue, lhsIndex, rhsIndex));
};

/**
 * Determines the minimum and maximum values in this iter. Returns the minimum value and index, and the maximum value and index. If this iter is empty, this function returns null.
 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const result = iter(['bob', 'beth', 'sue']).minmax();
 * // result: { min: { value: 'beth', index: 1 }, max: { value: 'sue', index: 2 } }
 * @returns {minmax_result}
 */
iter.prototype.minmax = function minmax(comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue)) {
    let minIndex = -1;
    let maxIndex = -1;
    let minValue;
    let maxValue;
    let index = 0;
    for (let item of this) {
        if (minIndex === -1) {
            minIndex = maxIndex = index;
            minValue = maxValue = item;
        } else {
            if (comparer(minValue, item, minIndex, index) > 0) {
                minIndex = index;
                minValue = item;
            }
            if (comparer(maxValue, item, maxIndex, index) < 0) {
                maxIndex = index;
                maxValue = item;
            }
        }
        ++index;
    }
    if (minIndex === -1) {
        return null;
    }
    return { min: { value: minValue, index: minIndex }, max: { value: maxValue, index: maxIndex } };
};

/**
 * Applies a combiner/accumulator function over this iter, and returns the final value of the combination.
 * @param {combine} combine The callback used to combine values.
 * @param {*} [seed] The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter.
 * @example
 * const result = iter([1, 2, 3, 4]).fold((x, y) => x + y);
 * // result: 10
 * @example
 * const result = iter([1, 2, 3, 4]).fold((x, y) => x + y, 13);
 * // result: 23
 * @returns {*}
 */
iter.prototype.fold = function fold(combine, seed) {
    var result = this.scan(combine, seed).last();
    return result === null ? undefined : result.value;
};

/**
 * Builds an array from the values in this iter.
 * @example
 * const result = iter.range(1).take(3).toArray();
 * // result: [1, 2, 3]
 * @returns {Array}
 */
iter.prototype.toArray = function toArray() {
    const result = [];
    for (let item of this) {
        result.push(item);
    }
    return result;
};

/**
 * Transforms an iterable of values into an iterable of key/value pairs.
 * @param {iterable} it The source iterable.
 * @param {transform} keySelector The function to get a key from the iterable value.
 * @param {transform} [valueSelector] The function to get a value from the iterable value. If not specified, the iter values are used as the values.
 * @private
 */
function *keyValuePairs(it, keySelector, valueSelector = x => x) {
    let index = 0;
    for (let item of it) {
        yield [keySelector(item, index), valueSelector(item, index)];
        ++index;
    }
}

/**
 * Builds an object from the values in this iter.
 * @param {transformString} nameSelector A function used to get the property name from a value in this iter.
 * @param {transform} [valueSelector] A function used to get the property value from a value in this iter. If not specified, the iter values are used as the property values.
 * @example
 * const result = iter.range(1).take(3).toObject(x => 'val' + x);
 * // result: { val1: 1, val2: 2, val3: 3 }
 * @returns {object}
 */
iter.prototype.toObject = function toObject(nameSelector, valueSelector = x => x) {
    const result = {};
    for (let kvp of keyValuePairs(this, nameSelector, valueSelector)) {
        result[kvp[0]] = kvp[1];
    }
    return result;
};

/**
 * Builds a map from the values in this iter.
 * @param {transform} keySelector A function used to get the map key from a value in this iter.
 * @param {transform} [valueSelector] A function used to get the map value from a value in this iter. If not specified, the iter values are used as the map values.
 * @example
 * const result = iter.range(1).take(3).toMap(x => 'val' + x);
 * // result: new Map([[val1, 1], [val2, 2], [val3, 3]])
 * @returns {Map}
 */
iter.prototype.toMap = function toMap(keySelector, valueSelector = x => x) {
    return new Map(keyValuePairs(this, keySelector, valueSelector));
};

/**
 * Builds a set from the values in this iter.
 * @example
 * const result = iter.range(1).take(3).toSet();
 * // result: new Set([1, 2, 3])
 * @returns {Set}
 */
iter.prototype.toSet = function toSet() {
    return new Set(this);
};

/**
 * Performs a lexicographical comparison of this iter with another iterable. Returns -1 if this iter is less than the other; +1 if this iter is greater than the other; and 0 if both are equivalent.
 * @param {iterable} otherIterable The other iterable.
 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
 * @example
 * const result = iter([1, 2]).compare([1, 2]);
 * // result: 0
 * @example
 * const result = iter([1, 2]).compare([2, 2]);
 * // result: -1
 * @returns {number} Always returns 0, -1, or +1, regardless of what the comparison method returns.
 */
iter.prototype.compare = function compare(otherIterable, comparer) {
    return iter.compare(this, otherIterable, comparer);
};

/**
 * Determines whether this iter is equivalent to another iterable (that is, they are the same length and contain equivalent values in the same positions).
 * @param {iterable} otherIterable The other iterable.
 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
 * @example
 * const result = iter([1, 2]).equal([1, 2]);
 * // result: true
 * @example
 * const result = iter([1, 2]).equal([2, 2]);
 * // result: false
 * @returns {boolean}
 */
iter.prototype.equal = function equal(otherIterable, equals) {
    return iter.equal(this, otherIterable, equals);
};

/**
 * Finds the first mismatch between this iter and another iterable. Returns an object containing the value from this iter, the value from the other iter, and the index of the values. If one iterable ends before the other, that iterable's value returned as "undefined". If no mismatch is found, then this function returns null.
 * @param {iterable} otherIterable The other iterable.
 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
 * @example
 * const result = iter([1, 2]).findMismatch([2, 2]);
 * // result: { lhsValue: 1, rhsValue: 2, index: 0 }
 * @example
 * const result = iter([1, 2]).findMismatch([1, 2]);
 * // result: null
 * @returns {mismatch_result}
 */
iter.prototype.findMismatch = function findMismatch(otherIterable, equals) {
    return iter.findMismatch(this, otherIterable, equals);
};

export default iter;

/**
 * An iterable; any object that has an @@iterator method.
 * @typedef {(Array|String|Map|Set|Object)} iterable
 */

/**
 * An iterable object that has a prototype providing extended functionality from iter.js.
 * @typedef {Object} iter_type
 */

/**
 * A value returned from an iterable. This is an object containing the actual value along with the value's index in the iterable.
 * @typedef {{value:*, index:number}} find_result
 * @type {object}
 * @property {*} value The actual value from the iterable.
 * @property {number} index The index of the value within its iterable.
 */

/**
 * A mismatch result returned from two iterables. This is an object containing the actual values along with their index.
 * @typedef {{lhsValue:*, rhsValue:*, index:number}} mismatch_result
 * @type {object}
 * @property {*|undefined} lhsValue The value from the left-hand iterable.
 * @property {*|undefined} rhsValue The value from the right-hand iterable.
 * @property {number} index The index of both values in their respective iterables.
 */

/**
 * A result containing both a minimum and maximum find result. This is an object containing the actual values along with their indexes.
 * @typedef {{min:find_result, max:find_result}} minmax_result
 * @type {object}
 * @property {find_result} min The minimum value and its index.
 * @property {find_result} max The maximum value and its index.
 */

/**
 * A callback used to compare two values.
 * @callback comparer
 * @param {*} lhsValue The "left-hand" value to compare.
 * @param {*} rhsValue The "right-hand" value to compare.
 * @param {number} lhsIndex The index of the left-hand value in its source iterable. This parameter is always passed, but is not usually needed.
 * @param {number} rhsIndex The index of the right-hand value it its source iterable. This parameter is always passed, but is not usually needed.
 * @returns {number} A number which is less than zero if lhsValue < rhsValue; greater than zero if lhsValue > rhsValue; and zero if lhsValue is equivalent to rhsValue.
 */

/**
 * A callback used to determine whether two values are equivalent.
 * @callback equals
 * @param {*} lhsValue The "left-hand" value to compare.
 * @param {*} rhsValue The "right-hand" value to compare.
 * @param {number} lhsIndex The index of the left-hand value in its source iterable. This parameter is always passed, but is not usually needed.
 * @param {number} rhsIndex The index of the right-hand value it its source iterable. This parameter is always passed, but is not usually needed.
 * @returns {boolean} True if lhsValue is equivalent to rhsValue.
 */

/**
 * A callback used to combine/accumulate a value over an iter.
 * @callback combine
 * @param {*} current The current value of the combination.
 * @param {*} value The value from the iter to combine with the current value.
 * @param {number} index The index of the value from the iter. This parameter is always passed, but is not usually needed.
 * @returns {*} The new current value of the combination.
 */

/**
 * A callback used to evaluate a value in an iter and return a true/false designation.
 * @callback predicate
 * @param {*} value The value from the iter to evaluate.
 * @param {number} index The index of the value from the iter. This parameter is always passed, but is not usually needed.
 * @returns {boolean}
 */

/**
 * A callback used to respond to a value in an iter. Any return value is ignored.
 * @callback process
 * @param {*} value The value from the iter to process.
 * @param {number} index The index of the value from the iter. This parameter is always passed, but is not usually needed.
 */

/**
 * A callback used to transform a value in an iter into a new value.
 * @callback transform
 * @param {*} value The value from the iter to transform.
 * @param {number} index The index of the value from the iter. This parameter is always passed, but is not usually needed.
 * @returns {*} The new value.
 */

/**
 * A callback used to transform a value in an iter into a string.
 * @callback transformString
 * @param {*} value The value from the iter to transform.
 * @param {number} index The index of the value from the iter. This parameter is always passed, but is not usually needed.
 * @returns {string} The string value.
 */