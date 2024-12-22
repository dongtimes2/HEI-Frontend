import AppProvider from "@providers/index";

import { render, RenderOptions } from "@testing-library/react-native";

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: AppProvider, ...options });
};

export * from "@testing-library/react-native";
export { customRender as render };
