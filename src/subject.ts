import type { Listener } from './store';

type Observer<T> = (value: T) => void;

/**
 * Subject implements a simple observable pattern.
 * It stores a value, allows subscriptions, and notifies observers and listeners
 * when the value changes.
 */
export class Subject<T> {
  // Observers receive only the updated value
  private observers: Set<Observer<T>>;
  // Listeners will called when the value is changed
  private listeners: Set<Listener<T>>;
  // name for value in store
  private name: string;
  public value: T;

  constructor(name: string, value: T) {
    this.name = name;
    this.observers = new Set<Observer<T>>();
    this.listeners = new Set();
    this.value = value;
  }

  subscribe(observer: Observer<T>) {
    this.observers.add(observer);
    observer(this.value);
  }

  unsubscribe(observer: Observer<T>) {
    this.observers.delete(observer);
  }

  addListener(listener: Listener<T>) {
    this.listeners.add(listener);
  }

  removeListener(listener: Listener<T>) {
    this.listeners.delete(listener);
  }

  /**
   * Update the value and notify subscribers.
   * @param value - new value
   * @param isRunCallback - do not call listeners if false
   * @returns undefined
   */
  notify(value: T, isRunCallback: boolean = true) {
    // Do nothing if the new value is the same as the current one
    if (this.value === value) {
      return;
    }

    this.value = value;

    if (isRunCallback) {
      this.listeners.forEach((listener) => {
        listener(this.name, this.value);
      });
    }

    this.observers.forEach((observer) => {
      observer(this.value);
    });
  }
}
