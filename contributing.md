# Contributing

Contributions are welcome!

Issues and bug fixes, of course, and also any new algorithms that you want to see. However, this repository is for the core iterjs library, and most algorithms not already in iterjs would be a better fit for an iterjs extension.

## Scope of iterjs

The scope of iterjs is deliberately small. It's not a full replacement for .NET's LINQ or C++'s STL algorithms, though it was certainly influenced by those excellent libraries.

The algorithms in iterjs should fit within these parameters:

- The only requirement on objects should be the iterable requirement. If an algorithm requires additional data (e.g., knowing the length of an iterable, or the capability of iterating backwards, or random-access of values), then it belongs in an iterjs extension, and not in the core.
- Algorithms in iterjs should not iterate the entire sequence before yielding their first value. These kind of "buffering" algorithms are certainly useful, but can cause surprising behavior.
- Algorithms in iterjs should not iterate the sequence more than once. It is permissible to do a partial iteration, but not multiple iterations.
- If an algorithm **must** do either buffering or multiple iterations, it should prefer to do multiple iterations rather than buffering. `repeat` is an example of this rule.

This means that some common algorithms such as `reverse`, `sort`, and `group` do not fit within the iterjs core scope. However, they are all excellent candidates for iterjs extensions.
 
## Conceptual guidelines

These guidelines are useful when determining the semantics and API of your algorithm:

- If the algorithm takes an iter/iterable as a parameter, consider whether it makes sense to take an array of iters/iterables as a rest parameter. Prefer the rest parameter approach if it makes sense.
- If the algorithm takes an array of iters/iterables as a rest parameter, consider whether it makes sense to have this algorithm as a static method in addition to as an instance method.
- Iters/iterables can contain functions, arrays, iterables, and other iters. No "polymorphism" should be attempted on the values of an iter/iterable.
  - Specifically, if an algorithm takes an array of iters/iterables as a rest parameter, it should not have special or different behavior if there is only one argument passed.
 
## Code guidelines

If you do have an algorithm for iterjs (or an iterjs extension), please follow these guidelines for consistency:

- Never use `==` or `!=`.
- If you are using equality or relational operators (`===`, `<`, etc), consider whether they should be allowing an optional user-defined callback comparison function instead.
- All end-user-provided callback functions that take a value from the iter/iterable as a parameter, should also be passed the numeric index of that value.
  - For callback functions that take multiple values, all values should be passed, followed by all indexes.
