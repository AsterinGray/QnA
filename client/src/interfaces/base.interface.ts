export interface ActionDataPayload<T> {
  data: T;
  successHandler: (...args: never[]) => never;
  errorHandler: (...args: never[]) => never;
}
