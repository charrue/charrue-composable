import { useTimeoutBoolean } from "./index";
import { sleep } from "../tests/test-helper";

describe("useTimeoutBoolean", () => {
  test("basic usage", async () => {
    const [loading, { setState, toggle }] = useTimeoutBoolean();
    expect(loading.value).toBe(false);

    setState(true);
    expect(loading.value).toBe(true);

    setState(false);
    expect(loading.value).toBe(true);
    await sleep(500);
    expect(loading.value).toBe(false);

    toggle();
    expect(loading.value).toBe(true);
    toggle();
    expect(loading.value).toBe(true);
    await sleep(500);
    expect(loading.value).toBe(false);
  });

  test("set initialValue and intervals", async () => {
    const [loading, { toggle }] = useTimeoutBoolean(true, [1100, 500]);
    expect(loading.value).toBe(true);

    toggle(); // true -> false, 500ms
    expect(loading.value).toBe(true);
    await sleep(500);
    expect(loading.value).toBe(false);

    toggle(); // false -> true, 1100ms
    expect(loading.value).toBe(false);
    await sleep(500);
    expect(loading.value).toBe(false);
    await sleep(600);
    expect(loading.value).toBe(true);
  });
});
