export function configIfExist<T>(value: T | undefined, callback: (value: T) => void) {
    if (value) {
      callback(value);
    }
  }