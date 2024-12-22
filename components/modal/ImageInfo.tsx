import { StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";

import { IImage } from "@api/index";
import { useTheme } from "@hooks/useTheme";

interface IImageInfoProps {
  image: IImage;
}

const getImageName = (url: string) => {
  const urlParts = url.split("__");
  return urlParts[urlParts.length - 1];
};

const getImageDate = (url: string) => {
  const timestamp = url.split("__")[0].split("/")[1];
  const date = new Date(parseInt(timestamp)).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return date;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
};

const ImageInfo = ({ image }: IImageInfoProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={{ uri: image.url }} style={styles.image} />
      <View style={styles.infoArea}>
        <Text
          style={[styles.text, { color: theme.text }]}
        >{`Name: ${getImageName(image.key)}`}</Text>
        <Text
          style={[styles.text, { color: theme.text }]}
        >{`Size: ${formatFileSize(image.size)}`}</Text>
        <Text
          style={[styles.text, { color: theme.text }]}
        >{`Date: ${getImageDate(image.key)}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "space-between",
    height: 300,
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "contain",
  },
  infoArea: {
    alignItems: "flex-start",
    gap: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ImageInfo;
