# iterjs
An ES6 library for working with iterables and generator functions.

[![GitHub version](https://badge.fury.io/gh/StephenCleary%2Fiterjs.svg)](http://badge.fury.io/gh/StephenCleary%2Fiterjs) [![Build status (lint + tests)](https://ci.appveyor.com/api/projects/status/i7bov5c24s2gp27a?svg=true)](https://ci.appveyor.com/project/StephenCleary/iterjs)

[![Dependency Status](https://david-dm.org/StephenCleary/iterjs.svg)](https://david-dm.org/StephenCleary/iterjs) [![devDependency Status](https://david-dm.org/StephenCleary/iterjs/dev-status.svg)](https://david-dm.org/StephenCleary/iterjs#info=devDependencies)

## Quickstart

Install from npm (or bower):

    npm install iterjs
    
Then, import the iterjs library:

    import iter from 'iterjs';

Since iterjs uses ES6 generators, you'll need to also import the Babel polyfill at some point in your application:

    import 'babel-polyfill';

## About iters

Iters are *lazily-evaluated sequences*. They allow you to create some fairly complex logic without actually having to execute it until you need to.

Conceptually, iters are like enumerables in .NET, or iterables in Python or JavaScript, or forward iterators in the C++ STL.

Iter.js is a library of common generator algorithms (similar to .NET's LINQ, Python's itertools, or C++ STL's algorithms).

## Enter the World of Iter

To start working with iterjs, you need an `iter` instance. This can be done by wrapping an existing iterable (array, map, set, or custom iterable object):
 
    // myIter: 1, 2, 3, 4, 5
    const myIter = iter([1, 2, 3, 4, 5]);
     
Or, if you just have some values you'd like to wrap into an `iter`, you can use a utility function:

    // myIter: 1, 2, 3, 4, 5
    const myIter = iter.values(1, 2, 3, 4, 5);
     
You can also create an iter from a generator method, like this:

    // myIter: 1, 2, 3, 4, 5
    const myIter = iter(function *() {
       for (let i = 0; i !== 5; ++i) {
           yield i + 1;
       }
    });
     
Iters can be infinite without any problems. This generator method never completes:

    // myIter: 13, 13, 13, 13, 13, 13, ...
    const myIter = iter(function *() {
        while (true) {
           yield 13;
        }
    });
     
Other "entry" methods include `iter.repeat` for repeating values and `iter.range` for numerical ranges. Both `repeat` and `range` are capable of creating infinite iters.

For example, `iter.repeat` can be used to duplicate the last example:
 
    // myIter: 13, 13, 13, 13, 13, 13, ...
    const myIter = iter.repeat(13);

`iter.repeat` can also be used to repeat only a specified number of times:

    // myIter: 13, 13, 13, 13
    const myIter = iter.repeat(13, 4);

Likewise, `iter.range` can be used to duplicate the earlier examples:
 
    // myIter: 1, 2, 3, 4, 5
    const myIter = iter.range(1, 6);

Note that the second parameter to `iter.range` is *not* the length of the iter; it is the (exclusive) end value of the iter. This has semantics such that `iter.range(x, y)` gives you an iterable over the mathematical half-open range `[x, y)`.

`iter.range` can also be used to generate infinite ranges:

    // myIter: 1, 2, 3, 4, 5, 6, 7, ...
    const myIter = iter.range(1);

## Enjoy the World of Iter

Two of the most useful iter methods are `map` and `filter`.

`map` takes each value in an iter and transforms it with a user-defined callback:

    // myIter: 2, 4, 6, 8, 10
    const myIter = iter.range(1, 6).map(x => x * 2);
    
`filter` takes each value in an iter and throws out any for which the filter callback returns a falsy value:

    // myIter: 2, 4
    const myIter = iter.range(1, 6).filter(x => x % 2 === 0);
    
`take` is another useful operator, especially when dealing with infinite iters. `take` will take only the specified number of values from an iter:

    // myIter: 1, 2, 3, 4, 5
    const myIter = iter.range(1).take(5);
    
`do` is an operator which does not change the iter values at all, but allows you to inject a callback that is invoked when the iter is evaluated. This is particularly useful when debugging:

    // myIter: 1, 2, 3, 4, 5
    const myIter = iter.range(1).do(x => console.log(x)).take(5);
    // Note that the console.log will be invoked when the iter is evaluated (see "Leaving the World of Iter" below); it has not been called yet. 
    
One very flexible algorithm is `scan`, which applies a "combining function" to the values in an iter:

    // myIter: 3, 6, 10, 15
    // (3 === 1 + 2), (6 === 3 + 3), (10 === 6 + 4), (15 === 10 + 5)
    const myIter = iter.range(1, 6).scan((x, y) => x + y);
    
There's also algorithms for combining values into iterables (`buffer`, `window`) or flattening them back out (`flatten`), combining iters (`concat`, `zip`, `merge`), full set operations (`setUnion`, etc), and many more!

See the [API docs](api.md) for full details.

## Leave the World of Iter

It's sad, but everyone moves on sometime. We understand.

All iters are iterables, so you can just use `for` `of` to get the values out:
 
    const myIter = iter.range(1, 6);
    for (let value of myIter) {
        console.log(value); // called once for each value: 1, 2, 3, 4, 5
    }
    
There's also a `forEach` algorithm that does a similar thing:

    iter.range(1, 6).forEach(x => console.log(x));
    
You can also convert them to arrays:

    // myArray: [1, 2, 3, 4, 5]
    const myArray = iter.range(1, 6).toArray();
    
Or sets:

    // mySet: 1, 2, 3, 4, 5
    const mySet = iter.range(1, 6).toSet();
    
Or even objects:

    // myObject: { val1: 1, val2: 2, val3: 3, val4: 4, val5: 5 }
    const myObject = iter.range(1, 6).toObject(x => 'val' + x.toString());
    
Often, you just want a single value out of the iter. There's special methods for getting the first or last value, or any value at an index:

    // myIter: 1, 2, 3, 4, 5
    const myIter = iter.range(1, 6);
    
    // firstValue: { value: 1, index: 0 }
    const firstValue = myIter.first();
    
    // lastValue: { value: 5, index: 4 }
    const lastValue = myIter.last();
    
    // thirdValue: { value: 3, index: 2 }
    const thirdValue = myIter.at(2);
    
Another common situation is to search for a value that matches some condition:

    // foundValue: { value: 4, index: 3 }
    const foundValue = myIter.find(x => x >= 4);
    
Sometimes, you just need some metadata; there's a couple convenience methods for determining the number of values in an iter, or testing if there's any values at all:

    // iterCount: 5
    const iterCount = iter.range(1, 6).count();
    
    // iterIsEmpty: false
    const iterIsEmpty = iter.range(1).isEmpty();
    
Finally, it's often useful to determine whether *every* (or *any*) values satisfy a predicate function:

    // everyValueIsEven: false
    const everyValueIsEven = iter.range(1, 6).every(x => x % 2 === 0);
    
    // anyValueIsEven: true
    const anyValueIsEven = iter.range(1, 6).some(x => x % 2 === 0);
    
One very flexible algorithm is `fold`. This algorithm applies a "combining" function over the values in an iter. You can use this for things like summing:

    // sum: 15
    // (15 === 1 + 2 + 3 + 4 + 5)
    const sum = iter.range(1, 6).fold((x, y) => x + y);
    
## Comparing iters

There's a few algorithms that perform comparisons of entire iters:

    const a = [1, 2, 3];
    const b = [1, 2, 4];
    
    // areEquivalent: false
    const areEquivalent = iter.equal(a, b);
    
    // compareResult: -1
    // (compare returns -1, 0, or 1)
    const compareResult = iter.compare(a, b);
    
    // mismatch: { lhsValue: 3, rhsValue: 4, index: 2 }
    const mismatch = iter.findMismatch(a, b);
    
## And More!

This is just a readme; see the [API docs](api.md) for full details!

Enjoy!