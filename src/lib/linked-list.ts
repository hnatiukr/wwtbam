/**
 * this file contains minimal, immutable linked list for sequential problems navigation
 * ensures single-instance usage and provides a simple way to iterate
 * spesifically for our game's store
 * as an alternative, albeit fast but unreliable access by index:
 * - `problems.first()` instead of `problems[0]`
 * - `problems.next()` instead of `problems[n]`
 *
 * see: 'src/store/context'
 */

export type Maybe<T> = T | null;

export interface ILinkedList<T> {
  first(): T;
  next(): Maybe<T>;
  all(): T[];
  size(): number;
}

/**
 * represents a node in a doubly linked list
 * each node holds data and references to the previous and next nodes
 */
export class Node<T> {
  constructor(public data: T) {}

  public prev: Maybe<Node<T>> = null;
  public next: Maybe<Node<T>> = null;
}

let hasInitialised = false;

export class LinkedList<T> implements ILinkedList<T> {
  private _size: number = 0;
  private _head: Maybe<Node<T>> = null;
  private _pointer: Maybe<Node<T>> = null;

  private _find_last(node: Node<T>): Node<T> {
    return node.next ? this._find_last(node.next) : node;
  }

  private _append(data: T): void {
    const node = new Node(data);

    this._size += 1;

    if (!this._head) {
      this._head = node;
    } else {
      const last_node = this._find_last(this._head);
      node.prev = last_node;
      last_node.next = node;
    }
  }

  private _collectData(node: Node<T>, collected_data: T[]): T[] {
    return node.next
      ? this._collectData(node.next, [...collected_data, node.data])
      : collected_data;
  }

  /**
   * creates a singly initialised linked list from an array of data
   * works as singleton - ensures that only one instance can be created
   */
  public constructor(data: readonly T[], __skipSingleInstance?: true) {
    if (hasInitialised && !__skipSingleInstance) {
      throw new Error("linked list: you can only create one instance");
    }

    if (!data) {
      throw new TypeError("linked list: constructor must not be empty");
    }

    if (!Array.isArray(data)) {
      throw new TypeError("linked list: constructor data must be an array");
    }

    for (const value of data) {
      this._append(value);
    }

    hasInitialised = true;
  }

  /**
   * resets the internal pointer to the first (head) node and returns its data
   */
  first(): T {
    if (!this._head) {
      throw new TypeError("linked list: _head must not be nullish");
    }

    this._pointer = this._head;
    return this._pointer.data;
  }

  /**
   * moves the internal pointer to the next node and returns its data or null
   */
  next(): Maybe<T> {
    if (!this._pointer) {
      throw new TypeError("linked list: _pointer must not be nullish");
    }

    if (this._pointer.next) {
      this._pointer = this._pointer.next;
      return this._pointer.data;
    }

    return null;
  }

  /**
   * traverses the list and returns an array with the collected data
   */
  all(): T[] {
    const collectedData: T[] = [];

    if (!this._head) {
      return collectedData;
    } else {
      return this._collectData(this._head, collectedData);
    }
  }

  /**
   * returns the number of collected items
   */
  size(): number {
    return this._size;
  }
}
