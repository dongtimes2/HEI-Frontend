import { PropsWithChildren } from "react";
import { Dimensions, Modal, Pressable, StyleSheet } from "react-native";

import { useModalStore } from "@stores/modal";

const ModalProvider = ({ children }: PropsWithChildren) => {
  const { isModalOpen, modalContent, closeModal } = useModalStore();
  const { height: screenHeight } = Dimensions.get("window");

  const modalHeight = screenHeight * 0.3;

  return (
    <>
      {children}
      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable onPress={closeModal} style={styles.overlay}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={[styles.content, { height: modalHeight }]}
          >
            {modalContent}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "80%",
  },
});

export default ModalProvider;
