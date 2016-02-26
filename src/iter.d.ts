interface Comparer<T> {
    (a: T, b: T): number;
}

interface Equals<T> {
    (a: T, b: T): boolean;
}

interface Combine<T, U> {
    (a: T, b: U): U;
}

interface Transform<T, U> {
    (a: T): U;
}

interface Predicate<T> {
    (a: T): boolean;
}

interface Process<T> {
    (a: T): void;
}

interface Generator<T> {
    (): Iterator<T>;
}

interface FindResult<T> {
    value: T;
    index: number;
}

interface MismatchResult<T> {
    lhsValue: T;
    rhsValue: T;
    index: number;
}

interface MinmaxResult<T> {
    min: FindResult<T>;
    max: FindResult<T>;
}

interface Iter<T> extends Iterable<T> {
    map<U>(transform: Transform<T, U>): Iter<U>;
    filter(predicate: Predicate<T>): Iter<T>;
    take(numberOrPredicate: (number | Predicate<T>)): Iter<T>;
    skip(numberOrPredicate: (number | Predicate<T>)): Iter<T>;
    do(process: Process<T>): Iter<T>;
    buffer(size: number): Iter<T[]>;
    window(size: number): Iter<T[]>;
    flatten<U>(transform?: Transform<T, Iterable<U>>): Iter<U>;
    filterConsecutiveDuplicates(equals?: Equals<T>): Iter<T>;
    scan(combine: Combine<T, T>, seed?: T): Iter<T>;
    scan<U>(combine: Combine<T, U>, seed: U): Iter<U>;
    concat(...others: Iterable<T>[]): Iter<T>;
    concat(...others: Iterable<any>[]): Iter<any>;
    repeat(count?: number): Iter<T>;
    zip(...others: Iterable<T>[]): Iter<T[]>;
    zip(...others: Iterable<any>[]): Iter<any[]>;
    merge(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
    setUnion(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
    setIntersection(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
    setSymmetricDifference(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
    setDifference(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
    interleave<U>(other: Iterable<U>): Iter<(T | U)>;

    forEach(process: Process<T>): void;
    count(): number;
    isEmpty(): boolean;
    first(): FindResult<T>;
    last(): FindResult<T>;
    at(index: number): FindResult<T>;
    find(predicate: Predicate<T>): FindResult<T>;
    every(predicate: Predicate<T>): boolean;
    some(predicate: Predicate<T>): boolean;
    min(comparer?: Comparer<T>): FindResult<T>;
    max(comparer?: Comparer<T>): FindResult<T>;
    minmax(comparer?: Comparer<T>): MinmaxResult<T>;
    fold(combine: Combine<T, T>, seed?: T): T;
    fold<U>(combine: Combine<T, U>, seed: U): U;
    toArray(): T[];
    toObject(nameSelector: Transform<T, string>): { [name: string]: T };
    toObject<U>(nameSelector: Transform<T, string>, valueSelector: Transform<T, U>): { [name: string]: U };
    toMap<K>(keySelector: Transform<T, K>): Map<K, T>;
    toMap<K, V>(keySelector: Transform<T, K>, valueSelector: Transform<T, V>): Map<K, V>;
    toSet(): Set<T>;
    equal(other: Iterable<T>, equals?: Equals<T>): boolean;
    findMismatch(other: Iterable<T>, equals?: Equals<T>): MismatchResult<T>;
}

declare function iter<T>(fnOrObject: (Iterable<T> | Generator<T>)): Iter<T>;
declare namespace iter {
    function values<T>(...items: T[]): Iter<T>;
    function range(start: number, end?: number): Iter<number>;
    function repeat<T>(value: T, count?: number): Iter<T>;
    function concat<T>(...iterables: Iterable<T>[]): Iter<T>;
    function concat(...iterables: Iterable<any>[]): Iter<any>;
    function zip<T>(...iterables: Iterable<T>[]): Iter<T[]>;
    function zip(...iterables: Iterable<any>[]): Iter<any[]>;
    function compare<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): number;
    function equal<T>(lhs: Iterable<T>, rhs: Iterable<T>, equals?: Equals<T>): boolean;
    function findMismatch<T>(lhs: Iterable<T>, rhs: Iterable<T>, equals?: Equals<T>): MismatchResult<T>;
    function merge<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
    function setUnion<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
    function setIntersection<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
    function setSymmetricDifference<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
    function setDifference<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
    function interleave<T, U>(lhs: Iterable<T>, rhs: Iterable<U>): Iter<(T | U)>;
}
export default iter;