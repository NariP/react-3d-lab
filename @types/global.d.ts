declare global {
    /** Array<T> 에서 T 타입을 추출하는 타입 */
    type UnwrapArray<T extends Array<any>> = T extends Array<infer U> ? U : never;

    /** Object 의 value 의 타입을 추출하는 타입 */
    type ValueOf<T> = T[keyof T];
}

export {};
