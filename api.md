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
    * [.length()](#iter+length) ⇒ <code>number</code>
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

<a name="iter+filter"></a>
### iter.filter(predicate) ⇒ <code>[iter_type](#iter_type)</code>
Filters an iter based on a predicate function. The returned iter contains only values for which the predicate function returns true.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>[predicate](#predicate)</code> | The predicate function used to determine whether each value is in the returned iter. |

<a name="iter+take"></a>
### iter.take(numberOrPredicate) ⇒ <code>[iter_type](#iter_type)</code>
Takes a number of values from this iter, and discards all later values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| numberOrPredicate | <code>number</code> &#124; <code>[predicate](#predicate)</code> | If a number, then this is the number of values to take from the iter. If a predicate, then values are taken from the iter as long as the predicate returns true. As soon as it returns false, the returned iter ends. |

<a name="iter+skip"></a>
### iter.skip(numberOrPredicate) ⇒ <code>[iter_type](#iter_type)</code>
Skips over a number of values from this iter, and then yields all later values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| numberOrPredicate | <code>number</code> &#124; <code>[predicate](#predicate)</code> | If a number, then this is the number of values to skip over from the iter. If a predicate, then values are skipped over from the iter as long as the predicate returns true. As soon as it returns false, the returned iter yields all later values. |

<a name="iter+do"></a>
### iter.do(process) ⇒ <code>[iter_type](#iter_type)</code>
Applies a function to each value in an iter as it is iterated, and passes the value through in the returned iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| process | <code>[process](#process)</code> | The function to call for each value as it is iterated. |

<a name="iter+buffer"></a>
### iter.buffer(size) ⇒ <code>[iter_type](#iter_type)</code>
Breaks an iter into buffers. The values of the returned iter are all arrays of the specified size, except for the last value which may be a smaller array containing the last few values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The buffer size. This must be an integer greater than 0. |

<a name="iter+window"></a>
### iter.window(size) ⇒ <code>[iter_type](#iter_type)</code>
Applies a sliding window over the iter. The values of the returned iter are all arrays of the specified size. The arrays are shallow-copied before they are yielded, so they can be safely mutated by consuming code.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The size of the window. This must be an integer greater than 0. |

<a name="iter+flatten"></a>
### iter.flatten() ⇒ <code>[iter_type](#iter_type)</code>
Takes an iter of iterables, and returns an iter that contains the values from each of those iterables.

**Kind**: instance method of <code>[iter](#iter)</code>  
<a name="iter+filterConsecutiveDuplicates"></a>
### iter.filterConsecutiveDuplicates([equals]) ⇒ <code>[iter_type](#iter_type)</code>
Filters runs of consecutive duplicates out of the source iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [equals] | <code>[equals](#equals)</code> | A callback used to determine item equality. If not specified, this function uses "Object.is". |

<a name="iter+scan"></a>
### iter.scan(combine, [seed]) ⇒ <code>[iter_type](#iter_type)</code>
Applies a combiner/accumulator function over an iter. Returns an iter containing the values of the combination.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| combine | <code>[combine](#combine)</code> | The callback used to combine values. |
| [seed] | <code>\*</code> | The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter. |

<a name="iter+concat"></a>
### iter.concat(...others) ⇒ <code>[iter_type](#iter_type)</code>
Concatenates this iter with any number of iterables.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...others | <code>[iterable](#iterable)</code> | The additional iterables to concatenate. If no iterables are passed to this function, then the returned iter is equivalent to the source iter. |

<a name="iter+repeat"></a>
### iter.repeat([count]) ⇒ <code>[iter_type](#iter_type)</code>
Repeats the values in this iter the specified number of times. Note that this iter is evaluated multiple times.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [count] | <code>number</code> | The number of times the value is repeated. If not specified, the returned iter repeats indefinitely. If the count is 0, the returned iter is empty. |

<a name="iter+zip"></a>
### iter.zip(...others) ⇒ <code>[iter_type](#iter_type)</code>
Combines the values in this iter with corresponding values from any number of iterables.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...others | <code>[iterable](#iterable)</code> | The other iterables to zip. If no iterables are passed to this function, then the returned iter is equivalent to the source iter. |

<a name="iter+merge"></a>
### iter.merge(otherIterable, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Merges this sorted iter with another sorted iterable, returning a new sorted iter. The returned iter contains all values from both source iterables, and may contain duplicates.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable to merge. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

<a name="iter+setUnion"></a>
### iter.setUnion(otherIterable, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set union of this iter with another iterable. Both source iterables must be sorted with no duplicate values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

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

<a name="iter+setDifference"></a>
### iter.setDifference(otherIterable, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set difference of this iter with another iterable, returning an iter containing only values from this iter that are not in the other iterable. Both source iterables must be sorted with no duplicate values.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

<a name="iter+forEach"></a>
### iter.forEach([process])
Iterates through the values of this iter, invoking a processing function for each value.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [process] | <code>[process](#process)</code> | The function to call for each value. If not specified, this function will still iterate through the values of this iter, causing any side effects. |

<a name="iter+length"></a>
### iter.length() ⇒ <code>number</code>
Determines the length of this iter; the length of an iter is the number of values it contains. This function will iterate through the entire iter.

**Kind**: instance method of <code>[iter](#iter)</code>  
<a name="iter+isEmpty"></a>
### iter.isEmpty() ⇒ <code>boolean</code>
Determines whether an iter is empty.

**Kind**: instance method of <code>[iter](#iter)</code>  
<a name="iter+first"></a>
### iter.first() ⇒ <code>[find_result](#find_result)</code>
Returns the first value in this iter, along with its index. If this iter is empty, this function returns null. If this iter is not empty, the returned index is always 0.

**Kind**: instance method of <code>[iter](#iter)</code>  
<a name="iter+last"></a>
### iter.last() ⇒ <code>[find_result](#find_result)</code>
Returns the last value in this iter, along with its index. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  
<a name="iter+at"></a>
### iter.at(index) ⇒ <code>[find_result](#find_result)</code>
Returns a specified value from this iter. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the value to return. |

<a name="iter+find"></a>
### iter.find(predicate) ⇒ <code>[find_result](#find_result)</code>
Returns the first value in this iter that satisfies a predicate, along with its index. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>[predicate](#predicate)</code> | The function used to determine whether this is the value we're searching for. |

<a name="iter+every"></a>
### iter.every(predicate) ⇒ <code>boolean</code>
Determines whether the specified predicate returns true for every value in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>[predicate](#predicate)</code> | The predicate to evaluate for each value in this iter. |

<a name="iter+some"></a>
### iter.some(predicate) ⇒ <code>boolean</code>
Determines whether the specified predicate returns true for any value in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>[predicate](#predicate)</code> | The predicate to evaluate for each value in this iter. |

<a name="iter+min"></a>
### iter.min([comparer]) ⇒ <code>[find_result](#find_result)</code>
Determines the minimum value in this iter. Returns the minimum value and its index. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [comparer] | <code>[comparer](#comparer)</code> | A callback used to compare items. If not specified, this function uses the < and > operators to compare items. |

<a name="iter+max"></a>
### iter.max([comparer]) ⇒ <code>[find_result](#find_result)</code>
Determines the maximum value in this iter. Returns the maximum value and its index. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [comparer] | <code>[comparer](#comparer)</code> | A callback used to compare items. If not specified, this function uses the < and > operators to compare items. |

<a name="iter+minmax"></a>
### iter.minmax([comparer]) ⇒ <code>[minmax_result](#minmax_result)</code>
Determines the minimum and maximum values in this iter. Returns the minimum value and index, and the maximum value and index. If this iter is empty, this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [comparer] | <code>[comparer](#comparer)</code> | A callback used to compare items. If not specified, this function uses the < and > operators to compare items. |

<a name="iter+fold"></a>
### iter.fold(combine, [seed]) ⇒ <code>\*</code>
Applies a combiner/accumulator function over this iter, and returns the final value of the combination.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| combine | <code>[combine](#combine)</code> | The callback used to combine values. |
| [seed] | <code>\*</code> | The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter. |

<a name="iter+toArray"></a>
### iter.toArray() ⇒ <code>Array</code>
Builds an array from the values in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  
<a name="iter+toObject"></a>
### iter.toObject(nameSelector, [valueSelector]) ⇒ <code>object</code>
Builds an object from the values in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| nameSelector | <code>[transformString](#transformString)</code> | A function used to get the property name from a value in this iter. |
| [valueSelector] | <code>[transform](#transform)</code> | A function used to get the property value from a value in this iter. If not specified, the iter values are used as the property values. |

<a name="iter+toMap"></a>
### iter.toMap(keySelector, [valueSelector]) ⇒ <code>Map</code>
Builds a map from the values in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| keySelector | <code>[transform](#transform)</code> | A function used to get the map key from a value in this iter. |
| [valueSelector] | <code>[transform](#transform)</code> | A function used to get the map value from a value in this iter. If not specified, the iter values are used as the map values. |

<a name="iter+toSet"></a>
### iter.toSet() ⇒ <code>Set</code>
Builds a set from the values in this iter.

**Kind**: instance method of <code>[iter](#iter)</code>  
<a name="iter+compare"></a>
### iter.compare(otherIterable, [comparer]) ⇒ <code>number</code>
Performs a lexicographical comparison of this iter with another iterable. Returns -1 if this iter is less than the other; +1 if this iter is greater than the other; and 0 if both are equivalent.

**Kind**: instance method of <code>[iter](#iter)</code>  
**Returns**: <code>number</code> - Always returns 0, -1, or +1, regardless of what the comparison method returns.  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | A callback used to compare items. If not specified, this function uses the < and > operators to compare items. |

<a name="iter+equal"></a>
### iter.equal(otherIterable, [equals]) ⇒ <code>boolean</code>
Determines whether this iter is equivalent to another iterable (that is, they are the same length and contain equivalent values in the same positions).

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [equals] | <code>[equals](#equals)</code> | A callback used to determine item equality. If not specified, this function uses "Object.is". |

<a name="iter+findMismatch"></a>
### iter.findMismatch(otherIterable, [equals]) ⇒ <code>[mismatch_result](#mismatch_result)</code>
Finds the first mismatch between this iter and another iterable. Returns an object containing the value from this iter, the value from the other iter, and the index of the values. If one iterable ends before the other, that iterable's value returned as "undefined". If no mismatch is found, then this function returns null.

**Kind**: instance method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| otherIterable | <code>[iterable](#iterable)</code> | The other iterable. |
| [equals] | <code>[equals](#equals)</code> | A callback used to determine item equality. If not specified, this function uses "Object.is". |

<a name="iter.values"></a>
### iter.values(...items) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter that iterates a series of values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...items | <code>\*</code> | The values to iterate over. If no values are passed to this function, then the returned iter is empty. |

<a name="iter.range"></a>
### iter.range(start, [end]) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter that iterates a range of integer values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>number</code> | An integer indicating the (inclusive) first value of the iter. |
| [end] | <code>number</code> | An optional integer indicating the (exclusive) end value of the iter. If not specified, the returned iter is infinite. |

<a name="iter.repeat"></a>
### iter.repeat(value, [count]) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter that repeats a value.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value that is repeated in the iter. |
| [count] | <code>number</code> | The number of times the value is repeated. If not specified, the returned iter repeats indefinitely. If the count is 0, the returned iter is empty. |

<a name="iter.concat"></a>
### iter.concat(...iterables) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter that is a concatenation of any number of iterables.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...iterables | <code>[iterable](#iterable)</code> | The iterables to concatenate. If no iterables are passed to this function, then the returned iter is empty. |

<a name="iter.zip"></a>
### iter.zip(...iterables) ⇒ <code>[iter_type](#iter_type)</code>
Creates an iter that combines corresponding values from any number of iterables.The resulting iter will yield arrays for its values, where the element of each array is the value retrieved from the corresponding iterable passed to this function.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...iterables | <code>[iterable](#iterable)</code> | The iterables to zip. If no iterables are passed to this function, then the returned iter is empty. |

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

<a name="iter.equal"></a>
### iter.equal(lhs, rhs, [equals]) ⇒ <code>boolean</code>
Determines whether two iterables are equivalent (are the same length and contain equivalent values in the same positions).

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first iterable to compare. |
| rhs | <code>[iterable](#iterable)</code> | The second iterable to compare. |
| [equals] | <code>[equals](#equals)</code> | A callback used to determine item equality. If not specified, this function uses "Object.is". |

<a name="iter.findMismatch"></a>
### iter.findMismatch(lhs, rhs, [equals]) ⇒ <code>[mismatch_result](#mismatch_result)</code>
Finds the first mismatch between two iterables. Returns an object containing the lhs value, the rhs value, and the index of the values. If one iterable ends before the other, that iterable's value returned as "undefined". If no mismatch is found, then this function returns null.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first iterable to compare. |
| rhs | <code>[iterable](#iterable)</code> | The second iterable to compare. |
| [equals] | <code>[equals](#equals)</code> | A callback used to determine item equality. If not specified, this function uses "Object.is". |

<a name="iter.merge"></a>
### iter.merge(lhs, rhs, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Merges two sorted iterables into a new sorted iter. The returned iter contains all values from both source iterables, and may contain duplicates.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first iterable to merge. |
| rhs | <code>[iterable](#iterable)</code> | The second iterable to merge. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

<a name="iter.setUnion"></a>
### iter.setUnion(lhs, rhs, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set union of two iterables. Both source iterables must be sorted with no duplicate values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first source iterable. |
| rhs | <code>[iterable](#iterable)</code> | The second source iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

<a name="iter.setIntersection"></a>
### iter.setIntersection(lhs, rhs, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set intersection of two iterables. Both source iterables must be sorted with no duplicate values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first source iterable. |
| rhs | <code>[iterable](#iterable)</code> | The second source iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

<a name="iter.setSymmetricDifference"></a>
### iter.setSymmetricDifference(lhs, rhs, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set symmetric difference of two iterables. Both source iterables must be sorted with no duplicate values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first source iterable. |
| rhs | <code>[iterable](#iterable)</code> | The second source iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

<a name="iter.setDifference"></a>
### iter.setDifference(lhs, rhs, [comparer]) ⇒ <code>[iter_type](#iter_type)</code>
Performs a set difference of two iterables, returning an iter containing only values from the first source iterable that are not in the second source iterable. Both source iterables must be sorted with no duplicate values.

**Kind**: static method of <code>[iter](#iter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>[iterable](#iterable)</code> | The first source iterable. |
| rhs | <code>[iterable](#iterable)</code> | The second source iterable. |
| [comparer] | <code>[comparer](#comparer)</code> | The comparer that was used to order the source iterables and which is used to order the returned iter. If not specified, this function uses the < and > operators to compare items. |

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
| lhsValue | <code>\*</code> | The value from the left-hand iterable. |
| rhsValue | <code>\*</code> | The value from the right-hand iterable. |
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
| [lhsIndex] | <code>\*</code> | The index of the left-hand value in its source iterable. This parameter is always passed, but is not usually needed. |
| [rhsIndex] | <code>\*</code> | The index of the right-hand value it its source iterable. This parameter is always passed, but is not usually needed. |

<a name="equals"></a>
## equals ⇒ <code>boolean</code>
A callback used to determine whether two values are equivalent.

**Kind**: global typedef  
**Returns**: <code>boolean</code> - True if lhsValue is equivalent to rhsValue.  

| Param | Type | Description |
| --- | --- | --- |
| lhsValue | <code>\*</code> | The "left-hand" value to compare. |
| rhsValue | <code>\*</code> | The "right-hand" value to compare. |
| [lhsIndex] | <code>\*</code> | The index of the left-hand value in its source iterable. This parameter is always passed, but is not usually needed. |
| [rhsIndex] | <code>\*</code> | The index of the right-hand value it its source iterable. This parameter is always passed, but is not usually needed. |

<a name="combine"></a>
## combine ⇒ <code>\*</code>
A callback used to combine/accumulate a value over an iter.

**Kind**: global typedef  
**Returns**: <code>\*</code> - The new current value of the combination.  

| Param | Type | Description |
| --- | --- | --- |
| current | <code>\*</code> | The current value of the combination. |
| value | <code>\*</code> | The value from the iter to combine with the current value. |
| [index] | <code>\*</code> | The index of the value from the iter. This parameter is always passed, but is not usually needed. |

<a name="predicate"></a>
## predicate ⇒ <code>boolean</code>
A callback used to evaluate a value in an iter and return a true/false designation.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value from the iter to evaluate. |
| [index] | <code>\*</code> | The index of the value from the iter. This parameter is always passed, but is not usually needed. |

<a name="process"></a>
## process : <code>function</code>
A callback used to respond to a value in an iter. Any return value is ignored.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value from the iter to process. |
| [index] | <code>\*</code> | The index of the value from the iter. This parameter is always passed, but is not usually needed. |

<a name="transform"></a>
## transform ⇒ <code>\*</code>
A callback used to transform a value in an iter into a new value.

**Kind**: global typedef  
**Returns**: <code>\*</code> - The new value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value from the iter to transform. |
| [index] | <code>\*</code> | The index of the value from the iter. This parameter is always passed, but is not usually needed. |

<a name="transformString"></a>
## transformString ⇒ <code>string</code>
A callback used to transform a value in an iter into a string.

**Kind**: global typedef  
**Returns**: <code>string</code> - The string value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value from the iter to transform. |
| [index] | <code>\*</code> | The index of the value from the iter. This parameter is always passed, but is not usually needed. |

