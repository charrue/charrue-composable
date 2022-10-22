import { Component } from "vue-demi";
declare type InstanceType<V> = V extends {
    new (...arg: any[]): infer X;
} ? X : never;
declare type VM<V> = InstanceType<V> & {
    unmount: () => void;
};
export declare function mount<V extends Component>(Comp: V): VM<V>;
export declare function sleep(time: number): Promise<void>;
export {};
