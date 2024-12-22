import { render } from "@tests/utils";

import { fireEvent } from "@testing-library/react-native";

import AddButton from "./Add";

describe("Add Button Test Suite", () => {
  it("should render correctly", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<AddButton onPress={onPress} />);
    expect(getByTestId("add-button")).toBeDefined();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<AddButton onPress={onPress} />);

    fireEvent.press(getByTestId("add-button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
