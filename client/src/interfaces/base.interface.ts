export interface ActionData<T> {
  data: T;
  successHandler: (...args: any[]) => any;
  errorHandler: (...args: any[]) => any;
}
