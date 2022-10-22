import {
  createApp,
  Component,
} from "vue-demi";

type InstanceType<V> = V extends { new (...arg: any[]): infer X } ? X : never;
type VM<V> = InstanceType<V> & { unmount: () => void };

export function mount<V extends Component>(Comp: V) {
  const el = document.createElement("div");
  const app = createApp(Comp);

  const unmount = () => app.unmount();
  const comp = app.mount(el) as VM<V>;
  comp.unmount = unmount;
  return comp;
}

export function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
