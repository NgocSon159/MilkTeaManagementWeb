export interface Formatter<T, K> {
    format(obj: T): K;
  }
  