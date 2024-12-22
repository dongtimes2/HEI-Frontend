import * as ImagePicker from "expo-image-picker";

import { useQuery } from "@tanstack/react-query";
import AWS from "aws-sdk";
import uuid from "react-native-uuid";

export interface IImage {
  key: string;
  size: number;
  url: string;
}

const BUCKET_NAME = process.env.EXPO_PUBLIC_AWS_BUCKET_NAME ?? "";

AWS.config.update({
  region: process.env.EXPO_PUBLIC_AWS_REGION ?? "",
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY ?? "",
  },
});

const s3 = new AWS.S3();

export const uploadImage = async (image: ImagePicker.ImagePickerAsset) => {
  try {
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const timestamp = Date.now();

    await s3
      .upload({
        Bucket: BUCKET_NAME,
        Key: `images/${timestamp}__${uuid.v4()}__${image.fileName}`,
        ContentType: image.mimeType,
        Body: blob,
      })
      .promise();
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getImage = async (): Promise<IImage[]> => {
  try {
    const result = await s3.listObjects({ Bucket: BUCKET_NAME, Prefix: "images/" }).promise();
    const files =
      result.Contents?.filter((file) => /\.(jpg|jpeg|png|HEIC)$/i.test(file.Key ?? "")).map(
        (file) => ({
          key: file.Key ?? "",
          size: file.Size ?? 0,
          url: `https://${BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${file.Key}`,
        }),
      ) ?? [];

    return files;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const useGetImage = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: getImage,
  });
};
