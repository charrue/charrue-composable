import DefaultTheme from "vitepress/theme";
import DemoContainer from "./components/DemoContainer.vue";

import "./styles/main.scss";
import "./styles/demo.scss";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: any) {
    app.component("DemoContainer", DemoContainer);
  },
};
