import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

import { uploadImage } from "@api/index";
import { useTheme } from "@hooks/useTheme";
import { useModalStore } from "@stores/modal";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUploadConfirmModalProps {
  image: ImagePicker.ImagePickerAsset;
}

const UploadConfirmModal = ({ image }: IUploadConfirmModalProps) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  const { theme } = useTheme();

  const { mutate: uploadImageMutate, isPending } = useMutation({
    mutationFn: uploadImage,
  });

  const handlePress = () => {
    uploadImageMutate(image, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["images"] });
        Alert.alert("사진이 등록되었습니다.");
      },
      onError: () => {
        Alert.alert("사진 등록에 실패했습니다.");
      },
      onSettled: () => {
        closeModal();
      },
    });
  };

  return (
    <View testID="upload-confirm" style={styles.container}>
      <View style={styles.imageArea}>
        <Image testID="upload-image" source={{ uri: image.uri }} style={styles.image} />
        <View style={styles.titleArea}>
          <Text style={[styles.title, { color: "#F9FAFB" }]}>사진을 등록하시겠습니까?</Text>
        </View>
      </View>
      <View style={styles.buttonArea}>
        <Pressable
          style={[styles.button, { backgroundColor: theme.muted }]}
          onPress={closeModal}
          disabled={isPending}
        >
          <Text style={[styles.text, { color: theme.foreground }]}>취소</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handlePress}
          disabled={isPending}
        >
          <Text style={[styles.text, { color: "#F9FAFB" }]}>등록</Text>
        </Pressable>
      </View>
      {isPending && (
        <View style={styles.loadingArea}>
          <ActivityIndicator size={60} color="#FFFFFF" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  titleArea: {
    width: "100%",
    height: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  imageArea: {
    position: "relative",
    height: "80%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonArea: {
    flexDirection: "row",
    height: "20%",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  loadingArea: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});

export default UploadConfirmModal;
