// Code rules:
//  Never use == or !=.
//  Carefully evaluate all uses of equality and relational operators to see if they should be allowing a user-defined operation instead.
//  Iters can contain functions, arrays, iterables, and iters. No polymorphism over the items contained in iters (i.e., no special border cases if a variadic function is passed a single iter/iterable argument).
//  If a method takes an iter, does it make sense to take an array of iters as a rest parameter?
//  If a method takes an array of iters, does it make sense to take an iter of iters as a static method?
// Note: no methods that cause evaluation of the entire sequence before the first result is returned. This means 'reverse', 'sort', 'join', 'distinct', and 'group' are unsupported.
// Callbacks taking a current item should also get a current index.


const iterPrototype = { };

/* Enter the world of iter */

/**
 * An iterable, either an array, string, map, set, typed array, or some other object that has an @@iterator method.
 * @typedef {(*[]|String|Map|Set|Object)} iterable
 * /

/**
 * An iterable object that has a prototype providing extended functionality from iter.js.
 * @typedef {Object} iter
 */

/**
 * Creates an iter from an iterable object or generator function. If no argument is passed, creates an empty iter.
 * @param {(Object|GeneratorFunction)} [fnOrObject] - If undefined, the returned iter is empty. If an iterable object, the returned iter is a wrapper around that iterable. If a generator function, the returned iter is a wrapper around that function.
 * @returns {iter}
 */
function iter(fnOrObject = []) {
    const result = Object.create(iterPrototype);
    if (typeof fnOrObject === 'function') {
        result[Symbol.iterator] = fnOrObject;
    } else {
        result[Symbol.iterator] = () => fnOrObject[Symbol.iterator]();
    }
    return result;
}

/**
 * Creates an iter that iterates a series of values.
 * @param {...*} items - The item values to iterate over.
 * @returns {iter}
 */
iter.values = function values(...items) {
    return iter(items);
};

/**
 * Creates an iter that iterates a range of integer values.
 * @param {Number} start - An integer indicating the (inclusive) first value of the iter.
 * @param {Number} [end] - An optional integer indicating the (exclusive) end value of the iter. If not specified, the returned iter is infinite.
 * @returns {iter}
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
 * @param {*} value - The value that is repeated in the iter.
 * @param {Number} [count] - The number of times the value is repeated. If not specified, the returned iter repeates indefinitely.
 * @returns {iter}
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
 * @param {...iterable} iterables - The iterables to concatenate.
 * @returns {iter}
 */
iter.concat = function concat(...iterables) {
    return iter(function *() {
        for (let iterable of iterables) {
            yield* iterable;
        }
    });
};

/**
 * Creates an iter that combines corresponding items from any number of iterables.
 * The resulting iter will yield arrays for its items, where the element of each array is the value retrieved from the corresponding iterable passed to this function.
 * @param {...iterable} iterables - The iterables to zip.
 * @returns {iter}
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
 * @param {iterable} lhs - The first iterable to compare.
 * @param {iterable} rhs - The second iterable to compare.
 * @param [comparer] - A callback used to compare items. If not specified, this function uses the < and > operators to compare items. The callback always receives the lhs item as its first argument and the rhs item as its second.
 * @returns {number} - Always returns 0, -1, or +1, regardless of what the comparison method returns.
 */
iter.compare = function compare(lhs, rhs, comparer = (lhsValue, rhsValue) => (lhsValue < rhsValue) ? -1 : Number(lhsValue > rhsValue)) {
    const iterL = lhs[Symbol.iterator]();
    const iterR = rhs[Symbol.iterator]();
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
        const result = comparer(nextL.value, nextR.value);
        if (result < 0) {
            return -1;
        } else if (result > 0) {
            return 1;
        }
    }
};

/**
 * Whether two iterables are equivalent.
 * @param {iterable} lhs - The first iterable to compare.
 * @param {iterable} rhs - The second iterable to compare.
 * @param [equals] - A callback used to determine item equality. If not specified, this function uses "Object.is". The callback always receives the lhs item as its first argument and the rhs item as its second.
 * @returns {boolean} - Always returns true or false.
 */
iter.equal = function equal(lhs, rhs, equals = Object.is) {
    const iterL = lhs[Symbol.iterator]();
    const iterR = rhs[Symbol.iterator]();
    while (true) {
        const nextL = iterL.next();
        const nextR = iterR.next();
        if (nextL.done && nextR.done) {
            return true;
        }
        if (nextL.done || nextR.done) {
            return false;
        }
        const result = equals(nextL.value, nextR.value);
        if (!result) {
            return false;
        }
    }
};

/* Enjoy the world of iter */

iterPrototype.scan = function scan(combine, seed) {
    const self = this;
    return iter(function *() {
        let index = 0;
        let current = seed;
        let first = true;
        for (let item of self) {
            if (first && seed === undefined) {
                first = false;
                current = item;
            } else {
                current = combine(current, item, index++);
                yield current;
            }
        }
    });
};

iterPrototype.buffer = function buffer(size) {
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

iterPrototype.window = function window(size) {
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

iterPrototype.take = function take(numberOrPredicate) {
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

iterPrototype.skip = function skip(numberOrPredicate) {
    const predicate = (typeof numberOrPredicate === 'number') ? (() => numberOrPredicate-- > 0) : numberOrPredicate;
    const self = this;
    return iter(function *() {
        let index = 0;
        for (let item of self) {
            if (predicate(item, index++)) {
                continue;
            }
            yield item;
        }
    });
};

iterPrototype.map = function map(transform) {
    const self = this;
    return iter(function *() {
        let index = 0;
        for (let item of self) {
            yield transform(item, index++);
        }
    });
};

iterPrototype.filter = function filter(predicate) {
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

iterPrototype.do = function _do(fn) {
    return this.map((item, index) => { fn(item, index); return item; });
};

iterPrototype.flatten = function flatten() {
    const self = this;
    return iter(function *() {
        for (let sequence of self) {
            yield* sequence;
        }
    });
};

iterPrototype.concat = function concat(...others) {
    return iter.concat(this, ...others);
};

iterPrototype.zip = function zip(...others) {
    return iter.zip(this, ...others);
};

iterPrototype.repeat = function repeat(count) {
    return iter.repeat(this, count).flatten();
};

/* Leave the world of iter */

iterPrototype.forEach = function forEach(fn = () => {}) {
    let index = 0;
    for (let item of this) {
        fn(item, index++);
    }
};

iterPrototype.length = function length() {
    let result = 0;
    for (let item of this) {
        ++result;
    }
    return result;
};

iterPrototype.isEmpty = function isEmpty() {
    return this[Symbol.iterator]().next().done;
};

iterPrototype.first = function first(defaultValue) {
    const next = this[Symbol.iterator]().next();
    if (!next.done) {
        return next.value;
    } else {
        return defaultValue;
    }
};

iterPrototype.last = function last(defaultValue) {
    let result = defaultValue;
    for (let item of this) {
        result = item;
    }
    return result;
};

iterPrototype.fold = function fold(combine, seed) {
    return this.scan(combine, seed).last();
};

iterPrototype.every = function every(predicate) {
    for (let item of this.map(predicate)) {
        if (!item) {
            return false;
        }
    }
    return true;
};

iterPrototype.some = function some(predicate) {
    for (let item of this.map(predicate)) {
        if (item) {
            return true;
        }
    }
    return false;
};

iterPrototype.at = function at(index, defaultValue) {
    let i = 0;
    for (let item of this) {
        if (i++ === index) {
            return item;
        }
    }
    return defaultValue;
};

iterPrototype.toArray = function toArray() {
    const result = [];
    for (let item of this) {
        result.push(item);
    }
    return result;
};

function *keyValuePairs(it, keySelector, valueSelector) {
    let index = 0;
    for (let item of it) {
        yield [keySelector(item, index), valueSelector(item, index)];
        ++index;
    }
}

iterPrototype.toObject = function toObject(nameSelector, valueSelector) {
    const result = {};
    for (let kvp of keyValuePairs(this, nameSelector, valueSelector)) {
        result[kvp[0]] = kvp[1];
    }
    return result;
};

iterPrototype.toMap = function toMap(keySelector, valueSelector) {
    return new Map(keyValuePairs(keySelector, valueSelector));
};

iterPrototype.toSet = function toSet() {
    return new Set(this);
};

export default iter;
