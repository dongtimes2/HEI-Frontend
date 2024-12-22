import { Pressable, StyleSheet } from "react-native";

import { useTheme } from "@hooks/useTheme";

import { Plus } from "lucide-react-native";

interface IAddButtonProps {
  onPress: () => void;
}

const AddButton = ({ onPress }: IAddButtonProps) => {
  const { theme } = useTheme();

  return (
    <Pressable
      testID="add-button"
      style={[styles.container, { backgroundColor: theme.primary }]}
      onPress={onPress}
    >
      <Plus color="#FFFFFF" size={30} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 54,
    height: 54,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddButton;
