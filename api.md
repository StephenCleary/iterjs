## Functions
<dl>
<dt><a href="#iter">iter([fnOrObject])</a> ⇒ <code><a href="#iter_type">iter_type</a></code></dt>
<dd><p>Creates an iter from an iterable object or generator function. If no argument is passed, creates an empty iter. This function can also be used to extend objects; if it is provided a &quot;this&quot; value, it will extend that object rather than creating a new iter.</p>
</dd>
</dl>
## Typedefs
<dl>
<dt><a href="#iterable">iterable</a> : <code>Array</code> | <code>String</code> | <code>Map</code> | <code>Set</code> | <code>Object</code></dt>
<dd><p>An iterable; any object that has an @@iterator method.</p>
</dd>
<dt><a href="#iter_type">iter_type</a> : <code>Object</code></dt>
<dd><p>An iterable object that has a prototype providing extended functionality from iter.js.</p>
</dd>
<dt><a href="#find_result">find_result</a> : <code>Object</code></dt>
<dd><p>A value returned from an iterable. This is an object containing the actual value along with the value&#39;s index in the iterable.</p>
</dd>
<dt><a href="#mismatch_result">mismatch_result</a> : <code>Object</code></dt>
<dd><p>A mismatch result returned from two iterables. This is an object containing the actual values along with their index.</p>
</dd>
<dt><a href="#minmax_result">minmax_result</a> : <code>Object</code></dt>
<dd><p>A result containing both a minimum and maximum find result. This is an object containing the actual values along with their indexes.</p>
</dd>
<dt><a href="#comparer">comparer</a> ⇒ <code>number</code></dt>
<dd><p>A callback used to compare two values.</p>
</dd>
<dt><a href="#equals">equals</a> ⇒ <code>boolean</code></dt>
<dd><p>A callback used to determine whether two values are equivalent.</p>
</dd>
<dt><a href="#combine">combine</a> ⇒ <code>*</code></dt>
<dd><p>A callback used to combine/accumulate a value over an iter.</p>
</dd>
<dt><a href="#predicate">predicate</a> ⇒ <code>boolean</code></dt>
<dd><p>A callback used to evaluate a value in an iter and return a true/false designation.</p>
</dd>
<dt><a href="#process">process</a> : <code>function</code></dt>
<dd><p>A callback used to respond to a value in an iter. Any return value is ignored.</p>
</dd>
<dt><a href="#transform">transform</a> ⇒ <code>*</code></dt>
<dd><p>A callback used to transform a value in an iter into a new value.</p>
</dd>
<dt><a href="#transformString">transformString</a> ⇒ <code>string</code></dt>
<dd><p>A callback used to transform a value in an iter into a string.</p>
</dd>
</dl>
<a name="iter"></a>
## iter([fnOrObject]) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter from an iterable object or generator function. If no argument is passed, creates an empty iter. This function can also be used to extend objects; if it is provided a "this" value, it will extend that object rather than creating a new iter.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [fnOrObject] | <code>Object</code> &#124; <code>GeneratorFunction</code> | If undefined, the returned iter is empty. If an iterable object, the returned iter is a wrapper around that iterable. If a generator function, the returned iter is a wrapper around that function. |

**Example**  
```js
const it = iter([3, 5, 7]);// 'it' contains: 3, 5, 7
```
**Example**  
```js
const it = iter(function *() {  yield 13;  yield 17;});// 'it' contains: 13, 17
```

* [iter([fnOrObject])](#iter) ⇒ <code>[iter_type](#iter_type)</code>
  * _instance_
    * [.map(transform)](#iter+map) ⇒ <code>[iter_type](#iter_type)</code>
    * [.filter(predicate)](#iter+filter) ⇒ <code>[iter_type](#iter_type)</code>
    * [.take(numberOrPredicate)](#iter+take) ⇒ <code>[iter_type](#iter_type)</code>
    * [.skip(numberOrPredicate)](#iter+skip) ⇒ <code>[iter_type](#iter_type)</code>
    * [.do(process)](#iter+do) ⇒ <code>[iter_type](#iter_type)</code>
    * [.buffer(size)](#iter+buffer) ⇒ <code>[iter_type](#iter_type)</code>
    * [.window(size)](#iter+window) ⇒ <code>[iter_type](#iter_type)</code>
    * [.flatten()](#iter+flatten) ⇒ <code>[iter_type](#iter_type)</code>
    * [.filterConsecutiveDuplicates([equals])](#iter+filterConsecutiveDuplicates) ⇒ <code>[iter_type](#iter_type)</code>
    * [.scan(combine, [seed])](#iter+scan) ⇒ <code>[iter_type](#iter_type)</code>
    * [.concat(...others)](#iter+concat) ⇒ <code>[iter_type](#iter_type)</code>
    * [.repeat([count])](#iter+repeat) ⇒ <code>[iter_type](#iter_type)</code>
    * [.zip(...others)](#iter+zip) ⇒ <code>[iter_type](#iter_type)</code>
    * [.merge(otherIterable, [comparer])](#iter+merge) ⇒ <code>[iter_type](#iter_type)</code>
    * [.setUnion(otherIterable, [comparer])](#iter+setUnion) ⇒ <code>[iter_type](#iter_type)</code>
    * [.setIntersection(otherIterable, [comparer])](#iter+setIntersection) ⇒ <code>[iter_type](#iter_type)</code>
    * [.setSymmetricDifference(otherIterable, [comparer])](#iter+setSymmetricDifference) ⇒ <code>[iter_type](#iter_type)</code>
    * [.setDifference(otherIterable, [comparer])](#iter+setDifference) ⇒ <code>[iter_type](#iter_type)</code>
    * [.forEach([process])](#iter+forEach)
    * [.count()](#iter+count) ⇒ <code>number</code>
    * [.isEmpty()](#iter+isEmpty) ⇒ <code>boolean</code>
    * [.first()](#iter+first) ⇒ <code>[find_result](#find_result)</code>
    * [.last()](#iter+last) ⇒ <code>[find_result](#find_result)</code>
    * [.at(index)](#iter+at) ⇒ <code>[find_result](#find_result)</code>
    * [.find(predicate)](#iter+find) ⇒ <code>[find_result](#find_result)</code>
    * [.every(predicate)](#iter+every) ⇒ <code>boolean</code>
    * [.some(predicate)](#iter+some) ⇒ <code>boolean</code>
    * [.min([comparer])](#iter+min) ⇒ <code>[find_result](#find_result)</code>
    * [.max([comparer])](#iter+max) ⇒ <code>[find_result](#find_result)</code>
    * [.minmax([comparer])](#iter+minmax) ⇒ <code>[minmax_result](#minmax_result)</code>
    * [.fold(combine, [seed])](#iter+fold) ⇒ <code>\*</code>
    * [.toArray()](#iter+toArray) ⇒ <code>Array</code>
    * [.toObject(nameSelector, [valueSelector])](#iter+toObject) ⇒ <code>object</code>
    * [.toMap(keySelector, [valueSelector])](#iter+toMap) ⇒ <code>Map</code>
    * [.toSet()](#iter+toSet) ⇒ <code>Set</code>
    * [.compare(otherIterable, [comparer])](#iter+compare) ⇒ <code>number</code>
    * [.equal(otherIterable, [equals])](#iter+equal) ⇒ <code>boolean</code>
    * [.findMismatch(otherIterable, [equals])](#iter+findMismatch) ⇒ <code>[mismatch_result](#mismatch_result)</code>
  * _static_
    * [.values(...items)](#iter.values) ⇒ <code>[iter_type](#iter_type)</code>
    * [.range(start, [end])](#iter.range) ⇒ <code>[iter_type](#iter_type)</code>
    * [.repeat(value, [count])](#iter.repeat) ⇒ <code>[iter_type](#iter_type)</code>
    * [.concat(...iterables)](#iter.concat) ⇒ <code>[iter_type](#iter_type)</code>
    * [.zip(...iterables)](#iter.zip) ⇒ <code>[iter_type](#iter_type)</code>
    * [.compare(lhs, rhs, [comparer])](#iter.compare) ⇒ <code>number</code>
    * [.equal(lhs, rhs, [equals])](#iter.equal) ⇒ <code>boolean</code>
    * [.findMismatch(lhs, rhs, [equals])](#iter.findMismatch) ⇒ <code>[mismatch_result](#mismatch_result)</code>
    * [.merge(lhs, rhs, [comparer])](#iter.merge) ⇒ <code>[iter_type](#iter_type)</code>
    * [.setUnion(lhs, rhs, [comparer])](#iter.setUnion) ⇒ <code>[iter_type](#iter_type)</code>
    * [.setIntersection(lhs, rhs, [comparer])](#iter.setIntersection) ⇒ <code>[iter_type](#iter_type)</code>
    * [.setSymmetricDifference(lhs, rhs, [comparer])](#iter.setSymmetricDifference) ⇒ <code>[iter_type](#iter_type)</code>
    * [.setDifference(lhs, rhs, [comparer])](#iter.setDifference) ⇒ <code>[iter_type](#iter_type)</code>

<a name="iter+map"></a>
### iter.map(transform) ⇒ <code>[iter_type](#iter_type)</code>
Applies a transformation function to each value in an iter. The returned iter contains the transformed values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| transform | <code>[transform](#transform)</code> | The transformation function to apply. |

**Example**  
```js
const it = iter([1, 2, 3, 4]).map(x => x * 2);// 'it' contains: 2, 4, 6, 8
```
<a name="iter+filter"></a>
### iter.filter(predicate) ⇒ <code>[iter_type](#iter_type)</code>
Filters an iter based on a predicate function. The returned iter contains only values for which the predicate function returns true.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>[predicate](#predicate)</code> | The predicate function used to determine whether each value is in the returned iter. |

**Example**  
```js
const it = iter([1, 2, 3, 4]).filter(x => x % 2 === 0);// 'it' contains: 2, 4
```
<a name="iter+take"></a>
### iter.take(numberOrPredicate) ⇒ <code>[iter_type](#iter_type)</code>
Takes a number of values from this iter, and discards all later values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| numberOrPredicate | <code>number</code> &#124; <code>[predicate](#predicate)</code> | If a number, then this is the number of values to take from the iter. If a predicate, then values are taken from the iter as long as the predicate returns true. As soon as it returns false, the returned iter ends. |

**Example**  
```js
const it = iter(['a', 'b', 'c', 'd', 'e']).take(3);// 'it' contains: 'a', 'b', 'c'
```
**Example**  
```js
const it = iter(1, 2, 3, 2, 4).take(x => x < 3);// 'it' contains: 1, 2
```
<a name="iter+skip"></a>
### iter.skip(numberOrPredicate) ⇒ <code>[iter_type](#iter_type)</code>
Skips over a number of values from this iter, and then yields all later values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| numberOrPredicate | <code>number</code> &#124; <code>[predicate](#predicate)</code> | If a number, then this is the number of values to skip over from the iter. If a predicate, then values are skipped over from the iter as long as the predicate returns true. As soon as it returns false, the returned iter yields all later values. |

**Example**  
```js
const it = iter(['a', 'b', 'c', 'd', 'e']).skip(3);// 'it' contains: 'd', 'e'
```
**Example**  
```js
const it = iter(1, 2, 3, 2, 4).skip(x => x < 3);// 'it' contains: 3, 2, 4
```
<a name="iter+do"></a>
### iter.do(process) ⇒ <code>[iter_type](#iter_type)</code>
Applies a function to each value in an iter as it is iterated, and passes the value through in the returned iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| process | <code>[process](#process)</code> | The function to call for each value as it is iterated. |

**Example**  
```js
const evilSideEffect = [];const it = iter([1, 2, 3]).do(x => evilSideEffect.push(x));// 'it' contains: 1, 2, 3// evilSideEffect: []const result = it.toArray();// result: [1, 2, 3]// evilSideEffect: [1, 2, 3]
```
<a name="iter+buffer"></a>
### iter.buffer(size) ⇒ <code>[iter_type](#iter_type)</code>
Breaks an iter into buffers. The values of the returned iter are all arrays of the specified size, except for the last value which may be a smaller array containing the last few values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The buffer size. This must be an integer greater than 0. |

**Example**  
```js
const it = iter([1, 2, 3, 4, 5, 6]).buffer(3);// 'it' contains: [1, 2, 3], [4, 5, 6]
```
<a name="iter+window"></a>
### iter.window(size) ⇒ <code>[iter_type](#iter_type)</code>
Applies a sliding window over the iter. The values of the returned iter are all arrays of the specified size. The arrays are shallow-copied before they are yielded, so they can be safely mutated by consuming code.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The size of the window. This must be an integer greater than 0. |

**Example**  
```js
const it = iter([1, 2, 3, 4, 5, 6]).window(3);// 'it' contains: [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]
```
<a name="iter+flatten"></a>
### iter.flatten() ⇒ <code>[iter_type](#iter_type)</code>
Takes an iter of iterables, and returns an iter that contains the values from each of those iterables.

**Kind**: instance method of <code>[iter](#iter)</code>  
**Example**  
```js
const it = iter([[1, 2], [3, 4, 5]]).flatten();// 'it' contains: [1, 2, 3, 4, 5]
```
<a name="iter+filterConsecutiveDuplicates"></a>
### iter.filterConsecutiveDuplicates([equals]) ⇒ <code>[iter_type](#iter_type)</code>
Filters runs of consecutive duplicates out of the source iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [equals] | <code>[equals](#equals)</code> | A callback used to determine item equality. If not specified, this function uses "Object.is". |

**Example**  
```js
const it = iter([1, 2, 2, 3, 2, 4, 5]).filterConsecutiveDuplicates();// 'it' contains: [1, 2, 3, 2, 4, 5]
```
<a name="iter+scan"></a>
### iter.scan(combine, [seed]) ⇒ <code>[iter_type](#iter_type)</code>
Applies a combiner/accumulator function over an iter. Returns an iter containing the values of the combination.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| combine | <code>[combine](#combine)</code> | The callback used to combine values. |
| [seed] | <code>\*</code> | The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter. |

**Example**  
```js
const it = iter([1, 2, 3, 4]).scan((x, y) => x * y);// 'it' contains: [2, 6, 24]
```
**Example**  
```js
const it = iter([1, 2, 3, 4]).scan((x, y) => x * y, 2);// 'it' contains: [2, 4, 12, 48]
```
<a name="iter+concat"></a>
### iter.concat(...others) ⇒ <code>[iter_type](#iter_type)</code>
Concatenates this iter with any number of iterables.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...others | <code>[iterable](#iterable)</code> | The additional iterables to concatenate. If no iterables are passed to this function, then the returned iter is equivalent to the source iter. |

**Example**  
```js
const it = iter([1, 2, 3]).concat([4, 5]);// 'it' contains: 1, 2, 3, 4, 5
```
**Example**  
```js
const it = iter([1, 2]).concat([4, 5], [3, 7]);// 'it' contains: 1, 2, 4, 5, 3, 7
```
<a name="iter+repeat"></a>
### iter.repeat([count]) ⇒ <code>[iter_type](#iter_type)</code>
Repeats the values in this iter the specified number of times. Note that this iter is evaluated multiple times.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [count] | <code>number</code> | The number of times the value is repeated. If not specified, the returned iter repeats indefinitely. If the count is 0, the returned iter is empty. |

**Example**  
```js
const it = iter(['a', 'b']).repeat(3);// 'it' contains: 'a', 'b', 'a', 'b', 'a', 'b'
```
**Example**  
```js
const it = iter([1, 2]).repeat();// 'it' contains: 1, 2, 1, 2, 1, 2, 1, 2, ...
```
<a name="iter+zip"></a>
### iter.zip(...others) ⇒ <code>[iter_type](#iter_type)</code>
Combines the values in this iter with corresponding values from any number of iterables.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...others | <code>[iterable](#iterable)</code> | The other iterables to zip. If no iterables are passed to this function, then the returned iter is equivalent to the source iter. |

**Example**  
```js
const it = iter(['a', 'b', 'c']).zip([1, 2, 3]);// 'it' contains: ['a', 1], ['b', 2], ['c', 3]
```
**Example**  
```js
const it = iter(['a', 'b']).zip([1, 2], [2, 4]);// 'it' contains: ['a', 1, 2], ['b', 2, 4]
```
<a name="iter+merge"></a>
### iter.merge(otherIterable, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Merges this sorted iter with another sorted iterable, returning a new sorted iter. The returned iter contains all values from both source iterables, and may contain duplicates.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable to merge. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const it = iter([1, 3]).merge([2, 3]);// 'it' contains: 1, 2, 3, 3
```
<a name="iter+setUnion"></a>
### iter.setUnion(otherIterable, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set union of this iter with another iterable. Both source iterables must be sorted with no duplicate values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const it = iter([1, 3]).setUnion([2, 3]);// 'it' contains: 1, 2, 3
```
<a name="iter+setIntersection"></a>
### iter.setIntersection(otherIterable, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set intersection of this iter with another iterable. Both source iterables must be sorted with no duplicate values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

<a name="iter+setSymmetricDifference"></a>
### iter.setSymmetricDifference(otherIterable, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set symmetric difference of this iter with another iterable. Both source iterables must be sorted with no duplicate values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const it = iter([1, 3]).setSymmetricDifference([2, 3]);// 'it' contains: 1, 2
```
<a name="iter+setDifference"></a>
### iter.setDifference(otherIterable, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set difference of this iter with another iterable, returning an iter containing only values from this iter that are not in the other iterable. Both source iterables must be sorted with no duplicate values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const it = iter([1, 3]).setDifference([2, 3]);// 'it' contains: 1
```
<a name="iter+forEach"></a>
### iter.forEach([process])
Iterates through the values of this iter, invoking a processing function for each value.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [process] | <code>[process](#process)</code> | The function to call for each value. If not specified, this function will still iterate through the values of this iter, causing any side effects. |

**Example**  
```js
let result = 0;iter([1, 2, 3]).forEach(x => { result += x; });// result: 6
```
<a name="iter+count"></a>
### iter.count() ⇒ <code>number</code>
Determines the number of values in this iter. This function will iterate through the entire iter.

**Kind**: instance method of <code>[iter](#iter)</code>  
**Example**  
```js
const result = iter([1, 2, 3]).count();// result: 3
```
<a name="iter+isEmpty"></a>
### iter.isEmpty() ⇒ <code>boolean</code>
Determines whether an iter is empty.

**Kind**: instance method of <code>[iter](#iter)</code>  
**Example**  
```js
const result = iter([1, 2, 3]).isEmpty();// result: false
```
**Example**  
```js
const result = iter().isEmpty();// result: true
```
<a name="iter+first"></a>
### iter.first() ⇒ <code>[find_result](#find_result)</code>
Returns the first value in this iter, along with its index. If this iter is empty, this function returns null. If this iter is not empty, the returned index is always 0.

**Kind**: instance method of <code>[iter](#iter)</code>  
**Example**  
```js
const result = iter(['bob', 'sue']).first();// result: { value: 'bob', index: 0 }
```
**Example**  
```js
const result = iter().first();// result: null
```
<a name="iter+last"></a>
### iter.last() ⇒ <code>[find_result](#find_result)</code>
Returns the last value in this iter, along with its index. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  
**Example**  
```js
const result = iter(['bob', 'beth', 'sue']).last();// result: { value: 'sue', index: 2 }
```
**Example**  
```js
const result = iter().last();// result: null
```
<a name="iter+at"></a>
### iter.at(index) ⇒ <code>[find_result](#find_result)</code>
Returns a specified value from this iter. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the value to return. |

**Example**  
```js
const result = iter(['bob', 'beth', 'sue']).at(1);// result: { value: 'beth', index: 1 }
```
**Example**  
```js
const result = iter(['bob', 'beth', 'sue']).at(100);// result: null
```
<a name="iter+find"></a>
### iter.find(predicate) ⇒ <code>[find_result](#find_result)</code>
Returns the first value in this iter that satisfies a predicate, along with its index. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>[predicate](#predicate)</code> | The function used to determine whether this is the value we're searching for. |

**Example**  
```js
const result = iter(['bob', 'beth', 'sue']).find(x => x[0] === 's');// result: { value: 'sue', index: 2 }
```
**Example**  
```js
const result = iter(['bob', 'beth', 'sue']).find(x => x[0] === 'x');// result: null
```
<a name="iter+every"></a>
### iter.every(predicate) ⇒ <code>boolean</code>
Determines whether the specified predicate returns true for every value in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>[predicate](#predicate)</code> | The predicate to evaluate for each value in this iter. |

**Example**  
```js
const result = iter(['bob', 'beth', 'sue']).every(x => typeof x === 'string');// result: true
```
<a name="iter+some"></a>
### iter.some(predicate) ⇒ <code>boolean</code>
Determines whether the specified predicate returns true for any value in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>[predicate](#predicate)</code> | The predicate to evaluate for each value in this iter. |

**Example**  
```js
const result = iter(['bob', 'beth', 'sue']).some(x => x[0] === 's');// result: true
```
<a name="iter+min"></a>
### iter.min([comparer]) ⇒ <code>[find_result](#find_result)</code>
Determines the minimum value in this iter. Returns the minimum value and its index. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [comparer] | <code>[comparer](#comparer)</code> | A callback used to compare items. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const result = iter(['bob', 'beth', 'sue']).min();// result: { value: 'beth', index: 1 }
```
<a name="iter+max"></a>
### iter.max([comparer]) ⇒ <code>[find_result](#find_result)</code>
Determines the maximum value in this iter. Returns the maximum value and its index. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [comparer] | <code>[comparer](#comparer)</code> | A callback used to compare items. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const result = iter(['bob', 'beth', 'sue']).max();// result: { value: 'sue', index: 2 }
```
<a name="iter+minmax"></a>
### iter.minmax([comparer]) ⇒ <code>[minmax_result](#minmax_result)</code>
Determines the minimum and maximum values in this iter. Returns the minimum value and index, and the maximum value and index. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [comparer] | <code>[comparer](#comparer)</code> | A callback used to compare items. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const result = iter(['bob', 'beth', 'sue']).minmax();// result: { min: { value: 'beth', index: 1 }, max: { value: 'sue', index: 2 } }
```
<a name="iter+fold"></a>
### iter.fold(combine, [seed]) ⇒ <code>\*</code>
Applies a combiner/accumulator function over this iter, and returns the final value of the combination.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| combine | <code>[combine](#combine)</code> | The callback used to combine values. |
| [seed] | <code>\*</code> | The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter. |

**Example**  
```js
const result = iter([1, 2, 3, 4]).fold((x, y) => x + y);// result: 10
```
**Example**  
```js
const result = iter([1, 2, 3, 4]).scan((x, y) => x + y, 13);// result: 23
```
<a name="iter+toArray"></a>
### iter.toArray() ⇒ <code>Array</code>
Builds an array from the values in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  
**Example**  
```js
const result = iter.range(1).take(3).toArray();// result: [1, 2, 3]
```
<a name="iter+toObject"></a>
### iter.toObject(nameSelector, [valueSelector]) ⇒ <code>object</code>
Builds an object from the values in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| nameSelector | <code>[transformString](#transformString)</code> | A function used to get the property name from a value in this iter. |
| [valueSelector] | <code>[transform](#transform)</code> | A function used to get the property value from a value in this iter. If not specified, the iter values are used as the property values. |

**Example**  
```js
const result = iter.range(1).take(3).toObject(x => 'val' + x);// result: { val1: 1, val2: 2, val3: 3 }
```
<a name="iter+toMap"></a>
### iter.toMap(keySelector, [valueSelector]) ⇒ <code>Map</code>
Builds a map from the values in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| keySelector | <code>[transform](#transform)</code> | A function used to get the map key from a value in this iter. |
| [valueSelector] | <code>[transform](#transform)</code> | A function used to get the map value from a value in this iter. If not specified, the iter values are used as the map values. |

**Example**  
```js
const result = iter.range(1).take(3).toMap(x => 'val' + x);// result: new Map([[val1, 1], [val2, 2], [val3, 3]])
```
<a name="iter+toSet"></a>
### iter.toSet() ⇒ <code>Set</code>
Builds a set from the values in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  
**Example**  
```js
const result = iter.range(1).take(3).toSet();// result: new Set([1, 2, 3])
```
<a name="iter+compare"></a>
### iter.compare(otherIterable, [comparer]) ⇒ <code>number</code>
Performs a lexicographical comparison of this iter with another iterable. Returns -1 if this iter is less than the other; +1 if this iter is greater than the other; and 0 if both are equivalent.

**Kind**: instance method of <code>[iter](#iter)</code>  
**Returns**: <code>number</code> - Always returns 0, -1, or +1, regardless of what the comparison method returns.  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | A callback used to compare items. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const result = iter([1, 2]).compare([1, 2]);// result: 0
```
**Example**  
```js
const result = iter([1, 2]).compare([2, 2]);// result: -1
```
<a name="iter+equal"></a>
### iter.equal(otherIterable, [equals]) ⇒ <code>boolean</code>
Determines whether this iter is equivalent to another iterable (that is, they are the same length and contain equivalent values in the same positions).

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [equals] | <code>[equals](#equals)</code> | A callback used to determine item equality. If not specified, this function uses "Object.is". |

**Example**  
```js
const result = iter([1, 2]).equal([1, 2]);// result: true
```
**Example**  
```js
const result = iter([1, 2]).equal([2, 2]);// result: false
```
<a name="iter+findMismatch"></a>
### iter.findMismatch(otherIterable, [equals]) ⇒ <code>[mismatch_result](#mismatch_result)</code>
Finds the first mismatch between this iter and another iterable. Returns an object containing the value from this iter, the value from the other iter, and the index of the values. If one iterable ends before the other, that iterable's value returned as "undefined". If no mismatch is found, then this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [equals] | <code>[equals](#equals)</code> | A callback used to determine item equality. If not specified, this function uses "Object.is". |

**Example**  
```js
const result = iter([1, 2]).findMismatch([2, 2]);// result: { lhsValue: 1, rhsValue: 2, index: 0 }
```
**Example**  
```js
const result = iter([1, 2]).findMismatch([1, 2]);// result: null
```
<a name="iter.values"></a>
### iter.values(...items) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter that iterates a series of values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...items | <code>\*</code> | The values to iterate over. If no values are passed to this function, then the returned iter is empty. |

**Example**  
```js
const it = iter.values(3, 5, 7);// 'it' contains: 3, 5, 7
```
<a name="iter.range"></a>
### iter.range(start, [end]) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter that iterates a range of integer values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>number</code> | An integer indicating the (inclusive) first value of the iter. |
| [end] | <code>number</code> | An optional integer indicating the (exclusive) end value of the iter. If not specified, the returned iter is infinite. |

**Example**  
```js
const it = iter.range(0, 5);// 'it' contains: 0, 1, 2, 3, 4
```
**Example**  
```js
const it = iter.range(4, 7);// 'it' contains: 4, 5, 6
```
**Example**  
```js
const it = iter.range(3);// 'it' contains: 3, 4, 5, ...
```
<a name="iter.repeat"></a>
### iter.repeat(value, [count]) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter that repeats a value.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value that is repeated in the iter. |
| [count] | <code>number</code> | The number of times the value is repeated. If not specified, the returned iter repeats indefinitely. If the count is 0, the returned iter is empty. |

**Example**  
```js
const it = iter.repeat('bob', 3);// 'it' contains: 'bob', 'bob', 'bob'
```
**Example**  
```js
const it = iter.repeat('x');// 'it' contains: 'x', 'x', 'x', 'x', ...
```
<a name="iter.concat"></a>
### iter.concat(...iterables) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter that is a concatenation of any number of iterables.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...iterables | <code>[iterable](#iterable)</code> | The iterables to concatenate. If no iterables are passed to this function, then the returned iter is empty. |

**Example**  
```js
const it = iter.concat([1, 2, 3], [4, 5]);// 'it' contains: 1, 2, 3, 4, 5
```
**Example**  
```js
const it = iter.concat([1, 2], [4, 5], [3, 7]);// 'it' contains: 1, 2, 4, 5, 3, 7
```
<a name="iter.zip"></a>
### iter.zip(...iterables) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter that combines corresponding values from any number of iterables.The resulting iter will yield arrays for its values, where the element of each array is the value retrieved from the corresponding iterable passed to this function.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...iterables | <code>[iterable](#iterable)</code> | The iterables to zip. If no iterables are passed to this function, then the returned iter is empty. |

**Example**  
```js
const it = iter.zip(['a', 'b', 'c'], [1, 2, 3]);// 'it' contains: ['a', 1], ['b', 2], ['c', 3]
```
**Example**  
```js
const it = iter.zip(['a', 'b'], [1, 2], [2, 4]);// 'it' contains: ['a', 1, 2], ['b', 2, 4]
```
<a name="iter.compare"></a>
### iter.compare(lhs, rhs, [comparer]) ⇒ <code>number</code>
Performs a lexicographical comparison of two iterables. Returns -1 if the first iterable is less than the second; +1 if the first iterable is greater than the second; and 0 if both iterables are equivalent.

**Kind**: static method of <code>[iter](#iter)</code>  
**Returns**: <code>number</code> - Always returns 0, -1, or +1, regardless of what the comparison method returns.  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first iterable to compare. |
| rhs | <code>[iterable](#iterable)</code> | The second iterable to compare. |
| [comparer] | <code>[comparer](#comparer)</code> | A callback used to compare items. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const result = iter.compare([1, 2], [1, 2]);// result: 0
```
**Example**  
```js
const result = iter.compare([1, 2], [2, 2]);// result: -1
```
<a name="iter.equal"></a>
### iter.equal(lhs, rhs, [equals]) ⇒ <code>boolean</code>
Determines whether two iterables are equivalent (are the same length and contain equivalent values in the same positions).

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first iterable to compare. |
| rhs | <code>[iterable](#iterable)</code> | The second iterable to compare. |
| [equals] | <code>[equals](#equals)</code> | A callback used to determine item equality. If not specified, this function uses "Object.is". |

**Example**  
```js
const result = iter.equal([1, 2], [1, 2]);// result: true
```
**Example**  
```js
const result = iter.equal([1, 2], [2, 2]);// result: false
```
<a name="iter.findMismatch"></a>
### iter.findMismatch(lhs, rhs, [equals]) ⇒ <code>[mismatch_result](#mismatch_result)</code>
Finds the first mismatch between two iterables. Returns an object containing the lhs value, the rhs value, and the index of the values. If one iterable ends before the other, that iterable's value returned as "undefined". If no mismatch is found, then this function returns null.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first iterable to compare. |
| rhs | <code>[iterable](#iterable)</code> | The second iterable to compare. |
| [equals] | <code>[equals](#equals)</code> | A callback used to determine item equality. If not specified, this function uses "Object.is". |

**Example**  
```js
const result = iter.findMismatch([1, 2], [2, 2]);// result: { lhsValue: 1, rhsValue: 2, index: 0 }
```
**Example**  
```js
const result = iter.findMismatch([1, 2], [1, 2]);// result: null
```
<a name="iter.merge"></a>
### iter.merge(lhs, rhs, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Merges two sorted iterables into a new sorted iter. The returned iter contains all values from both source iterables, and may contain duplicates.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first iterable to merge. |
| rhs | <code>[iterable](#iterable)</code> | The second iterable to merge. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const it = iter.merge([1, 3], [2, 3]);// 'it' contains: 1, 2, 3, 3
```
<a name="iter.setUnion"></a>
### iter.setUnion(lhs, rhs, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set union of two iterables. Both source iterables must be sorted with no duplicate values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first source iterable. |
| rhs | <code>[iterable](#iterable)</code> | The second source iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const it = iter.setUnion([1, 3], [2, 3]);// 'it' contains: 1, 2, 3
```
<a name="iter.setIntersection"></a>
### iter.setIntersection(lhs, rhs, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set intersection of two iterables. Both source iterables must be sorted with no duplicate values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first source iterable. |
| rhs | <code>[iterable](#iterable)</code> | The second source iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const it = iter([1, 3]).setIntersection([2, 3]);// 'it' contains: 3
```
<a name="iter.setSymmetricDifference"></a>
### iter.setSymmetricDifference(lhs, rhs, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set symmetric difference of two iterables. Both source iterables must be sorted with no duplicate values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first source iterable. |
| rhs | <code>[iterable](#iterable)</code> | The second source iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const it = iter.setSymmetricDifference([1, 3], [2, 3]);// 'it' contains: 1, 2
```
<a name="iter.setDifference"></a>
### iter.setDifference(lhs, rhs, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set difference of two iterables, returning an iter containing only values from the first source iterable that are not in the second source iterable. Both source iterables must be sorted with no duplicate values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first source iterable. |
| rhs | <code>[iterable](#iterable)</code> | The second source iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

**Example**  
```js
const it = iter.setDifference([1, 3], [2, 3]);// 'it' contains: 1
```
<a name="iterable"></a>
## iterable : <code>Array</code> &#124; <code>String</code> &#124; <code>Map</code> &#124; <code>Set</code> &#124; <code>Object</code>
An iterable; any object that has an @@iterator method.

**Kind**: global typedef  
<a name="iter_type"></a>
## iter_type : <code>Object</code>
An iterable object that has a prototype providing extended functionality from iter.js.

**Kind**: global typedef  
<a name="find_result"></a>
## find_result : <code>Object</code>
A value returned from an iterable. This is an object containing the actual value along with the value's index in the iterable.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The actual value from the iterable. |
| index | <code>number</code> | The index of the value within its iterable. |

<a name="mismatch_result"></a>
## mismatch_result : <code>Object</code>
A mismatch result returned from two iterables. This is an object containing the actual values along with their index.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| lhsValue | <code>\*</code> &#124; <code>undefined</code> | The value from the left-hand iterable. |
| rhsValue | <code>\*</code> &#124; <code>undefined</code> | The value from the right-hand iterable. |
| index | <code>number</code> | The index of both values in their respective iterables. |

<a name="minmax_result"></a>
## minmax_result : <code>Object</code>
A result containing both a minimum and maximum find result. This is an object containing the actual values along with their indexes.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| min | <code>[find_result](#find_result)</code> | The minimum value and its index. |
| max | <code>[find_result](#find_result)</code> | The maximum value and its index. |

<a name="comparer"></a>
## comparer ⇒ <code>number</code>
A callback used to compare two values.

**Kind**: global typedef  
**Returns**: <code>number</code> - A number which is less than zero if lhsValue < rhsValue; greater than zero if lhsValue > rhsValue; and zero if lhsValue is equivalent to rhsValue.  

| Param | Type | Description |
| --- | --- | --- |
| lhsValue | <code>\*</code> | The "left-hand" value to compare. |
| rhsValue | <code>\*</code> | The "right-hand" value to compare. |
| lhsIndex | <code>number</code> | The index of the left-hand value in its source iterable. This parameter is always passed, but is not usually needed. |
| rhsIndex | <code>number</code> | The index of the right-hand value it its source iterable. This parameter is always passed, but is not usually needed. |

<a name="equals"></a>
## equals ⇒ <code>boolean</code>
A callback used to determine whether two values are equivalent.

**Kind**: global typedef  
**Returns**: <code>boolean</code> - True if lhsValue is equivalent to rhsValue.  

| Param | Type | Description |
| --- | --- | --- |
| lhsValue | <code>\*</code> | The "left-hand" value to compare. |
| rhsValue | <code>\*</code> | The "right-hand" value to compare. |
| lhsIndex | <code>number</code> | The index of the left-hand value in its source iterable. This parameter is always passed, but is not usually needed. |
| rhsIndex | <code>number</code> | The index of the right-hand value it its source iterable. This parameter is always passed, but is not usually needed. |

<a name="combine"></a>
## combine ⇒ <code>\*</code>
A callback used to combine/accumulate a value over an iter.

**Kind**: global typedef  
**Returns**: <code>\*</code> - The new current value of the combination.  

| Param | Type | Description |
| --- | --- | --- |
| current | <code>\*</code> | The current value of the combination. |
| value | <code>\*</code> | The value from the iter to combine with the current value. |
| index | <code>number</code> | The index of the value from the iter. This parameter is always passed, but is not usually needed. |

<a name="predicate"></a>
## predicate ⇒ <code>boolean</code>
A callback used to evaluate a value in an iter and return a true/false designation.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value from the iter to evaluate. |
| index | <code>number</code> | The index of the value from the iter. This parameter is always passed, but is not usually needed. |

<a name="process"></a>
## process : <code>function</code>
A callback used to respond to a value in an iter. Any return value is ignored.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value from the iter to process. |
| index | <code>number</code> | The index of the value from the iter. This parameter is always passed, but is not usually needed. |

<a name="transform"></a>
## transform ⇒ <code>\*</code>
A callback used to transform a value in an iter into a new value.

**Kind**: global typedef  
**Returns**: <code>\*</code> - The new value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value from the iter to transform. |
| index | <code>number</code> | The index of the value from the iter. This parameter is always passed, but is not usually needed. |

<a name="transformString"></a>
## transformString ⇒ <code>string</code>
A callback used to transform a value in an iter into a string.

**Kind**: global typedef  
**Returns**: <code>string</code> - The string value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value from the iter to transform. |
| index | <code>number</code> | The index of the value from the iter. This parameter is always passed, but is not usually needed. |

