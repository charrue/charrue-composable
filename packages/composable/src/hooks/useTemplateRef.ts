import { templateRef } from "@vueuse/core";
import type { Ref } from "vue-demi";

export default function useTemplateRef<T extends HTMLElement | SVGElement | null>(
  key: string,
  initialValue?: T | null,
): Readonly<Ref<T>> {
  return templateRef(key, initialValue);
}
