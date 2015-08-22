// Code rules:
//  Never use == or !=.
//  Carefully evaluate all uses of equality and relational operators to see if they should be allowing a user-defined operation instead.
//  Iters can contain functions, arrays, iterables, and iters. No polymorphism over the items contained in iters (i.e., no special border cases if a variadic function is passed a single iter/iterable argument).
//  If a method takes an iter, does it make sense to take an array of iters as a rest parameter?
//  If a method takes an array of iters, does it make sense to take an iter of iters as a static method?
// Note: no methods that cause evaluation of the entire sequence before the first result is returned. This means 'reverse', 'sort', 'join', 'distinct', and 'group' are unsupported.
// Callbacks taking a current item should also get a current index.

//Inspirations:
// - C# LINQ
// - Python itertools
// - C++ STL

/* Enter the world of iter */

/**
 * Creates an iter from an iterable object or generator function. If no argument is passed, creates an empty iter.
 * @param {(Object|GeneratorFunction)} [fnOrObject] If undefined, the returned iter is empty. If an iterable object, the returned iter is a wrapper around that iterable. If a generator function, the returned iter is a wrapper around that function.
 * @returns {iter_type}
 */
function iter(fnOrObject = []) {
    const result = Object.create(iter.prototype);
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
 * @returns {iter_type}
 */
iter.values = function values(...items) {
    return iter(items);
};

/**
 * Creates an iter that iterates a range of integer values.
 * @param {number} start An integer indicating the (inclusive) first value of the iter.
 * @param {number} [end] An optional integer indicating the (exclusive) end value of the iter. If not specified, the returned iter is infinite.
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
 * Merges two sorted iterables into a new sorted iter. The returned iter contains all values from both source iterables, and may contain duplicates.
 * @param {iterable} lhs The first iterable to merge.
 * @param {iterable} rhs The second iterable to merge.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
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

/**
 * Finds the first mismatch between two iterables. Returns a 3-element array containing the lhs value, the rhs value, and the index of the values. If one iterable ends before the other, that iterable's value returned as "undefined". If no mismatch is found, then the default value parameter is returned along with an index of -1.
 * @param {iterable} lhs The first iterable to compare.
 * @param {iterable} rhs The second iterable to compare.
 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
 * @param {*} [defaultValue] The value to return if no mismatch is found.
 * @returns {Array}
 */
iter.findMismatch = function findMismatch(lhs, rhs, equals = Object.is, defaultValue = undefined) {
    const iterL = lhs[Symbol.iterator]();
    const iterR = rhs[Symbol.iterator]();
    let index = 0;
    while (true) {
        const nextL = iterL.next();
        const nextR = iterR.next();
        if (nextL.done && nextR.done) {
            return [defaultValue, defaultValue, -1];
        }
        if (nextL.done) {
            return [undefined, nextR.value, index];
        }
        if (nextR.done) {
            return [nextL.value, undefined, index];
        }
        const result = equals(nextL.value, nextR.value, index, index);
        if (!result) {
            return [nextL.value, nextR.value, index];
        }
        ++index;
    }
};

/* Set operations */

/**
 * Performs a set union of two iterables. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} lhs The first source iterable.
 * @param {iterable} rhs The second source iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
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

/* Enjoy the world of iter */

/**
 * Applies a combiner/accumulator function over an iter. Returns an iter containing the values of the combination.
 * @param {combine} combine The callback used to combine values.
 * @param {*} [seed] The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter.
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
 * Breaks an iter into buffers. The values of the returned iter are all arrays of the specified size, except for the last value which may be a smaller array containing the last few values.
 * @param {number} size The buffer size.
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
 * Applies a sliding window over the iter. The values of the returned iter are all arrays of the specified size. The arrays are already shallow-copied, so they can be safely mutated by consuming code.
 * @param {number} size The size of the window.
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
                yield result.slice();
            } else {
                result.push(item);
            }
        }
    });
};

/**
 * Takes a number of values from this iter, and discards all later values.
 * @param {number|predicate} numberOrPredicate If a number, then this is the number of values to take from the iter. If a predicate, then values are taken from the iter as long as the predicate returns true. As soon as it returns false, the returned iter ends.
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
 * Applies a transformation function to each value in an iter. The returned iter contains the transformed values.
 * @param {transform} transform The transformation function to apply.
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
 * Applies a function to each value in an iter as it is iterated, and passes the value through in the returned iter.
 * @param {process} process The function to call for each value as it is iterated.
 * @returns {iter_type}
 */
iter.prototype.do = function _do(process) {
    return this.map((item, index) => { process(item, index); return item; });
};

/**
 * Takes an iter of iterables, and returns an iter that contains the values from each of those iterables.
 * @returns {iter_type}
 */
iter.prototype.flatten = function flatten() {
    const self = this;
    return iter(function *() {
        for (let sequence of self) {
            yield* sequence;
        }
    });
};

/**
 * Removes consecutive duplicates from the source iter.
 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
 * @returns {iter_type}
 */
iter.prototype.removeConsecutiveDuplicates = function removeConsecutiveDuplicates(equals = Object.is) {
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
            } else {
                if (equals(lastValue, item, lastValueIndex, index++)) {
                    continue;
                }
                lastValueIndex = index - 1;
                lastValue = item;
                yield lastValue;
            }
        }
    });
};

/**
 * Concatenates this iter with any number of iterables.
 * @param {...iterable} others The additional iterables to concatenate. If no iterables are passed to this function, then the returned iter is equivalent to the source iter.
 * @returns {iter_type}
 */
iter.prototype.concat = function concat(...others) {
    return iter.concat(this, ...others);
};

/**
 * Combines the values in this iter with corresponding values from any number of iterables.
 * @param {...iterable} others The othre iterables to zip. If no iterables are passed to this function, then the returned iter is equivalent to the source iter.
 * @returns {iter_type}
 */
iter.prototype.zip = function zip(...others) {
    return iter.zip(this, ...others);
};

/**
 * Repeats the values in this iter the specified number of times.
 * @param {number} [count] The number of times the value is repeated. If not specified, the returned iter repeats indefinitely. If the count is 0, the returned iter is empty.
 * @returns {iter_type}
 */
iter.prototype.repeat = function repeat(count) {
    return iter.repeat(this, count).flatten();
};

/**
 * Merges this sorted iter with another sorted iterable, returning a new sorted iter. The returned iter contains all values from both source iterables, and may contain duplicates.
 * @param {iterable} otherIterable The other iterable to merge.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @returns {iter_type}
 */
iter.prototype.mergeWith = function mergeWith(otherIterable, comparer) {
    return iter.merge(this, otherIterable, comparer);
};

/**
 * Performs a set union of this iter with another iterable. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} otherIterable The other iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @returns {iter_type}
 */
iter.prototype.setUnionWith = function setUnionWith(otherIterable, comparer) {
    return iter.setUnion(this, otherIterable, comparer);
};

/**
 * Performs a set intersection of this iter with another iterable. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} otherIterable The other iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @returns {iter_type}
 */
iter.prototype.setIntersectionWith = function setIntersectionWith(otherIterable, comparer) {
    return iter.setIntersection(this, otherIterable, comparer);
};

/**
 * Performs a set symmetric difference of this iter with another iterable. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} otherIterable The other iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @returns {iter_type}
 */
iter.prototype.setSymmetricDifferenceWith = function setSymmetricDifferenceWith(otherIterable, comparer) {
    return iter.setSymmetricDifference(this, otherIterable, comparer);
};

/**
 * Performs a set difference of this iter with another iterable, returning an iter containing only values from this iter that are not in the other iterable. Both source iterables must be sorted with no duplicate values.
 * @param {iterable} otherIterable The other iterable.
 * @param {comparer} [comparer] The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items.
 * @returns {iter_type}
 */
iter.prototype.setDifferenceWith = function setDifferenceWith(otherIterable, comparer) {
    return iter.setDifference(this, otherIterable, comparer);
};

/* Leave the world of iter */

/**
 * Iterates through the values of this iter, invoking a processing function for each value.
 * @param {process} [process] The function to call for each value. If not specified, this function will still iterate through the values of this iter, causing any side effects.
 */
iter.prototype.forEach = function forEach(process = () => {}) {
    let index = 0;
    for (let item of this) {
        process(item, index++);
    }
};

/**
 * Determines the length of this iter; the length of an iter is the number of values it contains. This function will iterate through the entire iter.
 * @returns {number}
 */
iter.prototype.length = function length() {
    let result = 0;
    for (let item of this) {
        ++result;
    }
    return result;
};

/**
 * Determines whether an iter is empty.
 * @returns {boolean}
 */
iter.prototype.isEmpty = function isEmpty() {
    return this[Symbol.iterator]().next().done;
};

/**
 * Returns the first value in this iter, along with its index. If this iter is empty, this function returns the default value parameter with an index of -1. If this iter is not empty, the returned index is always 0.
 * @param {*} [defaultValue] The value to return if this iter is empty.
 * @returns {find_result}
 */
iter.prototype.first = function first(defaultValue) {
    const next = this[Symbol.iterator]().next();
    if (!next.done) {
        return [next.value, 0];
    } else {
        return [defaultValue, -1];
    }
};

/**
 * Returns the last value in this iter, along with its index. If this iter is empty, this function returns the default value parameter with an index of -1.
 * @param {*} [defaultValue] The value to return if this iter is empty.
 * @returns {find_result}
 */
iter.prototype.last = function last(defaultValue) {
    let result = defaultValue;
    let index = -1;
    for (let item of this) {
        result = item;
        ++index;
    }
    return [result, index];
};

/**
 * Returns the first value in this iter that satisfies a predicate, along with its index. If this iter is empty, this function returns the default value parameter with an index of -1.
 * @param {predicate} predicate The function used to determine whether this is the value we're searching for.
 * @param {*} [defaultValue] The value to return if this iter is empty.
 * @returns {find_result}
 */
iter.prototype.find = function find(predicate, defaultValue) {
    let index = -1;
    for (let item of this) {
        if (predicate(item, ++index)) {
            return [item, index];
        }
    }
    return [defaultValue, -1];
};

/**
 * Returns a specified value from this iter. If this iter is empty, this function returns the default value parameter with an index of -1.
 * @param {number} index The index of the value to return.
 * @param {*} [defaultValue] The value to return if this iter is empty.
 * @returns {find_result}
 */
iter.prototype.at = function at(index, defaultValue) {
    return find((_, i) => i === index, defaultValue);
};

/**
 * Applies a combiner/accumulator function over this iter, and returns the final value of the combination.
 * @param {combine} combine The callback used to combine values.
 * @param {*} [seed] The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter.
 * @returns {*}
 */
iter.prototype.fold = function fold(combine, seed) {
    return this.scan(combine, seed).last()[0];
};

/**
 * Determines the minimum and maximum values in this iter. Returns the minimum value and index, and the maximum value and index. If this iter is empty, this function returns the default value parameters with indexes of -1.
 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
 * @param {*} [defaultMinValue] The value to return for the minimum value if this iter is empty.
 * @param {*} [defaultMaxValue] The value to return for the maximum value if this iter is empty.
 * @returns {find_result[]}
 */
iter.prototype.minmax = function minmax(comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue),
                                       defaultMinValue = undefined, defaultMaxValue = undefined) {
    let minIndex = -1;
    let maxIndex = -1;
    let minValue = defaultMinValue;
    let maxValue = defaultMaxValue;
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
    }
    return [[minValue, minIndex], [maxValue, maxIndex]];
};

/**
 * Determines the minimum value in this iter. Returns the minimum value and its index. If this iter is empty, this function returns the default value parameter with an index of -1.
 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
 * @param {*} [defaultValue] The value to return if this iter is empty.
 * @returns {find_result}
 */
iter.prototype.min = function min(comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue), defaultValue = undefined) {
    let minIndex = -1;
    let minValue = defaultValue;
    let index = 0;
    for (let item of this) {
        if (minIndex === -1) {
            minIndex = index;
            minValue = item;
        } else if (comparer(minValue, item, minIndex, index) > 0) {
            minIndex = index;
            minValue = item;
        }
    }
    return [minValue, minIndex];
};

/**
 * Determines the maximum value in this iter. Returns the maximum value and its index. If this iter is empty, this function returns the default value parameter with an index of -1.
 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
 * @param {*} [defaultValue] The value to return if this iter is empty.
 * @returns {find_result}
 */
iter.prototype.max = function max(comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue), defaultValue = undefined) {
    let maxIndex = -1;
    let maxValue = defaultValue;
    let index = 0;
    for (let item of this) {
        if (maxIndex === -1) {
            maxIndex = index;
            maxValue = item;
        } else if (comparer(maxValue, item, maxIndex, index) < 0) {
            maxIndex = index;
            maxValue = item;
        }
    }
    return [maxValue, maxIndex];
};

/**
 * Determines whether the specified predicate returns true for every value in this iter.
 * @param {predicate} predicate The predicate to evaluate for each value in this iter.
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
 * Builds an array from the values in this iter.
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
 * @param {transform} valueSelector The function to get a value from the iterable value.
 * @private
 */
function *keyValuePairs(it, keySelector, valueSelector) {
    let index = 0;
    for (let item of it) {
        yield [keySelector(item, index), valueSelector(item, index)];
        ++index;
    }
}

/**
 * Builds an object from the values in this iter.
 * @param {transformString} nameSelector A function used to get the property name from a value in this iter.
 * @param {transform} valueSelector A function used to get the property value from a value in this iter.
 * @returns {{}}
 */
iter.prototype.toObject = function toObject(nameSelector, valueSelector) {
    const result = {};
    for (let kvp of keyValuePairs(this, nameSelector, valueSelector)) {
        result[kvp[0]] = kvp[1];
    }
    return result;
};

/**
 * Builds a map from the values in this iter.
 * @param {transform} keySelector A function used to get the map key from a value in this iter.
 * @param {transform} valueSelector A function used to get the map value from a value in this iter.
 * @returns {Map}
 */
iter.prototype.toMap = function toMap(keySelector, valueSelector) {
    return new Map(keyValuePairs(keySelector, valueSelector));
};

/**
 * Builds a set from the values in this iter.
 * @returns {Set}
 */
iter.prototype.toSet = function toSet() {
    return new Set(this);
};

/**
 * Performs a lexicographical comparison of this iter with another iterable. Returns -1 if this iter is less than the other; +1 if this iter is greater than the other; and 0 if both are equivalent.
 * @param {iterable} otherIterable The other iterable.
 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
 * @returns {number} Always returns 0, -1, or +1, regardless of what the comparison method returns.
 */
iter.prototype.compareTo = function compareTo(otherIterable, comparer) {
    return iter.compare(this, otherIterable, comparer);
};

/**
 * Determines whether this iter is equivalent to another iterable (that is, they are the same length and contain equivalent values in the same positions).
 * @param {iterable} otherIterable The other iterable.
 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
 * @returns {boolean}
 */
iter.prototype.equalTo = function equalTo(otherIterable, equals) {
    return iter.equal(this, otherIterable, equals);
};

/**
 * Finds the first mismatch between this iter and another iterable. Returns a 3-element array containing the value from this iter, the value from the other iter, and the index of the values. If one iterable ends before the other, that iterable's value returned as "undefined". If no mismatch is found, then the default value parameter is returned along with an index of -1.
 * @param {iterable} otherIterable The other iterable.
 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
 * @param {*} [defaultValue] The value to return if no mismatch is found.
 * @returns {Array}
 */
iter.prototype.findMismatchWith = function findMismatchWith(otherIterable, equals, defaultValue) {
    return iter.findMismatch(this, otherIterable, equals, defaultValue);
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
 * A value returned from an iterable. This is a two-element array, where the first element is the actual value, and the second element is the value's index in the iterable.
 * @typedef {Array} find_result
 */

/**
 * A callback used to compare two values.
 * @callback comparer
 * @param {*} lhsValue The "left-hand" value to compare.
 * @param {*} rhsValue The "right-hand" value to compare.
 * @param {*} [lhsIndex] The index of the left-hand value in its source iterable. This parameter is always passed, but is not usually needed.
 * @param {*} [rhsIndex] The index of the right-hand value it its source iterable. This parameter is always passed, but is not usually needed.
 * @returns {number} A number which is less than zero if lhsValue < rhsValue; greater than zero if lhsValue > rhsValue; and zero if lhsValue is equivalent to rhsValue.
 */

/**
 * A callback used to determine whether two values are equivalent.
 * @callback equals
 * @param {*} lhsValue The "left-hand" value to compare.
 * @param {*} rhsValue The "right-hand" value to compare.
 * @param {*} [lhsIndex] The index of the left-hand value in its source iterable. This parameter is always passed, but is not usually needed.
 * @param {*} [rhsIndex] The index of the right-hand value it its source iterable. This parameter is always passed, but is not usually needed.
 * @returns {boolean} True if lhsValue is equivalent to rhsValue.
 */

/**
 * A callback used to combine/accumulate a value over an iter.
 * @callback combine
 * @param {*} current The current value of the combination.
 * @param {*} value The value from the iter to combine with the current value.
 * @param {*} [index] The index of the value from the iter. This parameter is always passed, but is not usually needed.
 * @returns {*} The new current value of the combination.
 */

/**
 * A callback used to evaluate a value in an iter and return a true/false designation.
 * @callback predicate
 * @param {*} value The value from the iter to evaluate.
 * @param {*} [index] The index of the value from the iter. This parameter is always passed, but is not usually needed.
 * @returns {boolean}
 */

/**
 * A callback used to respond to a value in an iter. Any return value is ignored.
 * @callback process
 * @param {*} value The value from the iter to process.
 * @param {*} [index] The index of the value from the iter. This parameter is always passed, but is not usually needed.
 */

/**
 * A callback used to transform a value in an iter into a new value.
 * @callback transform
 * @param {*} value The value from the iter to transform.
 * @param {*} [index] The index of the value from the iter. This parameter is always passed, but is not usually needed.
 * @returns {*} The new value.
 */

/**
 * A callback used to transform a value in an iter into a string.
 * @callback transformString
 * @param {*} value The value from the iter to transform.
 * @param {*} [index] The index of the value from the iter. This parameter is always passed, but is not usually needed.
 * @returns {string} The string value.
 */