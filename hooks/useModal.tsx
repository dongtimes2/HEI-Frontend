import { useModalStore } from "@stores/modal";

const useModal = () => {
  const { isModalOpen, openModal, closeModal } = useModalStore();

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
