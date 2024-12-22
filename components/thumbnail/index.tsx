import { Pressable, StyleSheet } from "react-native";

import { Image } from "expo-image";

import { IImage } from "@api/index";
import ImageInfo from "@components/modal/ImageInfo";
import { useModalStore } from "@stores/modal";

interface IThumbnailProps {
  image: IImage;
}

const Thumbnail = ({ image }: IThumbnailProps) => {
  const { openModal } = useModalStore();

  const handlePress = () => {
    openModal(<ImageInfo image={image} />);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image source={{ uri: image.url }} style={styles.image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "33%",
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Thumbnail;
