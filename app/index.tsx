import { FlatList, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { useGetImage } from "@api/index";
import AddButton from "@components/button/Add";
import UploadConfirmModal from "@components/modal/UploadConfirm";
import Thumbnail from "@components/thumbnail";
import useModal from "@hooks/useModal";
import { useTheme } from "@hooks/useTheme";

import { useQueryClient } from "@tanstack/react-query";

const App = () => {
  const { openModal } = useModal();
  const { data } = useGetImage();
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      openModal(<UploadConfirmModal image={result.assets[0]} />);
    }
  };

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        backgroundColor: theme.card,
        padding: 12,
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Thumbnail image={item} />}
        numColumns={3}
        columnWrapperStyle={{ gap: 2 }}
        contentContainerStyle={{ gap: 2 }}
        refreshing={false}
        onRefresh={() => {
          queryClient.invalidateQueries({ queryKey: ["images"] });
        }}
      />
      <AddButton onPress={handleAddImage} />
    </View>
  );
};

export default App;
