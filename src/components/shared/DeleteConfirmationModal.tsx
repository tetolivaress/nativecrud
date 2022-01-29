import React, {useState} from 'react';
import {Modal, ActivityIndicator} from 'react-native';
import {
  ModalContainer,
  ConfirmationContainer,
  StyledBoldText,
  StyledButton,
  ButtonsContainer,
} from '../Theme/index';

interface Props {
  remove: () => void;
  toggle: () => void;
  message: string;
  undoMessage: string;
  open: boolean;
}

const DeleteConfirmationModal = (props: Props) => {
  const {remove, message, open, toggle, undoMessage} = props;
  const [removing, setRemoving] = useState<boolean>(false);

  const [cancelRemove, setCancelRemove] =
    useState<ReturnType<typeof setTimeout>>();

  const launchRemove = () => {
    setRemoving(true);
    setCancelRemove(setTimeout(remove, 2000));
  };

  const cancelRemoving = () => {
    cancelRemove && clearTimeout(cancelRemove);
    setCancelRemove(undefined);
    setRemoving(false);
  };

  return (
    <Modal animationType="fade" visible={open} transparent={true}>
      <ModalContainer>
        <ConfirmationContainer>
          <StyledBoldText>{message}</StyledBoldText>
          <ButtonsContainer>
            {!removing ? (
              <>
                <StyledButton onPress={launchRemove}>
                  <StyledBoldText>Remove:</StyledBoldText>
                </StyledButton>
                <StyledButton onPress={toggle}>
                  <StyledBoldText>Cancel:</StyledBoldText>
                </StyledButton>
              </>
            ) : (
              <>
                <StyledBoldText>{undoMessage}</StyledBoldText>
                <StyledButton onPress={cancelRemoving}>
                  <ActivityIndicator />
                  <StyledBoldText>Undo:</StyledBoldText>
                </StyledButton>
              </>
            )}
          </ButtonsContainer>
        </ConfirmationContainer>
      </ModalContainer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
