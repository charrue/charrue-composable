import { Ref } from "vue-demi";
/**
 * 可延迟地切换Boolean值的状态
 * @param {boolean} initialValue Boolean状态的默认值 @default false
 * @param {[number, number]} intervals
 *  状态切换的时间间隔
 *  接收一个长度为2的数字数组
 *  第一项表示切换到`true`的延迟执行时间
 *  第二项表示切换到`false`的延迟执行时间
 *  @default [0, 500]
 */
export declare const useTimeoutBoolean: (initialValue?: boolean, intervals?: [number, number]) => [Readonly<Ref<boolean>>, {
    setState: (val: boolean) => void;
    toggle: () => void;
}];
