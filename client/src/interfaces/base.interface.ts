export interface ActionDataPayload<T> {
    data: T;
    successHandler: (...args: never[]) => void;
    errorHandler: (...args: never[]) => void;
}