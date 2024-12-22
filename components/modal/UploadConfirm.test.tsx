import { Alert } from "react-native";

import { ImagePickerAsset } from "expo-image-picker";

import { render } from "@tests/utils";

import { MutationOptions } from "@tanstack/react-query";
import { fireEvent, waitFor } from "@testing-library/react-native";

import UploadConfirmModal from "./UploadConfirm";

const mockCloseModal = jest.fn();
const mockUseModalStore = jest.fn(() => ({
  closeModal: mockCloseModal,
}));
const mockInvalidateQueries = jest.fn();
const mockQueryClient = {
  invalidateQueries: mockInvalidateQueries,
};
const mockUploadImage = jest.fn();

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: () => mockQueryClient,
  useMutation: () => ({
    mutate: (_: ImagePickerAsset, options?: MutationOptions) => {
      return mockUploadImage()
        .then((data: any) => {
          options?.onSuccess?.(data, undefined, undefined);
        })
        .catch((error: Error) => {
          options?.onError?.(error, undefined, undefined);
        })
        .finally(() => {
          options?.onSettled?.(undefined, null, undefined, undefined);
        });
    },
    isPending: false,
  }),
}));

jest.mock("../../api/index.ts", () => ({
  uploadImage: jest.fn(),
}));

jest.mock("../../stores/modal", () => ({
  useModalStore: () => mockUseModalStore(),
}));

jest.spyOn(Alert, "alert");

describe("UploadConfirm Test Suite", () => {
  beforeEach(() => {
    mockCloseModal.mockClear();
    mockUseModalStore.mockClear();
    mockInvalidateQueries.mockClear();
    mockUploadImage.mockClear();
    jest.clearAllMocks();
  });

  const image = {
    uri: "https://example.com/image.jpg",
    width: 100,
    height: 100,
    fileName: "image.jpg",
    type: "image" as const,
  };

  it("should render correctly", () => {
    const { getByTestId, getByText } = render(<UploadConfirmModal image={image} />);

    expect(getByText("사진을 등록하시겠습니까?")).toBeDefined();
    expect(getByText("취소")).toBeDefined();
    expect(getByText("등록")).toBeDefined();
    expect(getByTestId("upload-image")).toBeDefined();
    expect(getByTestId("upload-confirm")).toBeDefined();
  });

  it("handles cancel button press", () => {
    const { getByText } = render(<UploadConfirmModal image={image} />);

    fireEvent.press(getByText("취소"));
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("handles successful upload", async () => {
    mockUploadImage.mockResolvedValueOnce({});

    const { getByText } = render(<UploadConfirmModal image={image} />);

    fireEvent.press(getByText("등록"));

    await waitFor(() => {
      expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ["images"] });
      expect(Alert.alert).toHaveBeenCalledWith("사진이 등록되었습니다.");
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });

  it("handles upload failure", async () => {
    mockUploadImage.mockRejectedValue(new Error("Upload failed"));

    const { getByText } = render(<UploadConfirmModal image={image} />);

    fireEvent.press(getByText("등록"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("사진 등록에 실패했습니다.");
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });
});
