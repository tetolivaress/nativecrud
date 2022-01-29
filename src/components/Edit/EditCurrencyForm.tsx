import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {ActivityIndicator, Modal} from 'react-native';
import {CurrencyToEdit} from '../../interfaces/Currencies';
import {
  FormContainer,
  StyledInput,
  StyledButton,
  StyledBoldText,
  ButtonsContainer,
  ModalContainer,
  ConfirmationContainer,
} from '../Theme/index';
import {useForm} from '../../hooks/useForm';
import {useFirebase} from '../../hooks/useFirebase';

export interface Props {
  currency: CurrencyToEdit;
}

const EditCurrencyForm = ({currency}: Props) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [removing, setRemoving] = useState<boolean>(false);
  const [cancelRemove, setCancelRemove] = useState<typeof setTimeout>();
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState<boolean>(false);
  const {navigate} = useNavigation();
  const {form, handleForm} = useForm({amount: currency.amount});
  const {EditCurrency, DeleteCurrency} = useFirebase();
  const updatedCurrency = {...currency, amount: form.amount};

  const sendNewCurrency = async () => {
    try {
      setIsUpdating(true);
      await EditCurrency(updatedCurrency);
      navigate('IndexScreen');
    } catch (error) {
      setIsUpdating(false);
      console.log(error);
    }
  };

  const remove = async () => {
    try {
      setIsUpdating(true);
      await DeleteCurrency(currency.name);
      navigate('IndexScreen');
    } catch (error) {
      setIsUpdating(false);
      console.log(error);
    }
  };

  const launchRemove = () => {
    setRemoving(true);
    setCancelRemove(setTimeout(remove, 2000));
  };

  const cancelRemoving = () => {
    clearTimeout(cancelRemove);
    setCancelRemove(undefined);
    setRemoving(false);
  };

  return (
    <FormContainer>
      <StyledInput
        placeholder="date"
        editable={false}
        value={currency.date}
        keyboardType="numeric"
        disabled={true}
        placeholderTextColor="#000"
      />
      <StyledInput
        placeholder="hour"
        editable={false}
        value={currency.hour}
        keyboardType="numeric"
        placeholderTextColor="#000"
        disabled={true}
      />
      <StyledInput
        placeholder="name"
        editable={false}
        value={currency.name}
        keyboardType="numeric"
        placeholderTextColor="#000"
        disabled={true}
      />
      <StyledInput
        placeholder="amount"
        onChangeText={value => handleForm(value, 'amount')}
        value={form.amount}
        keyboardType="numeric"
        placeholderTextColor="#000"
      />
      <ButtonsContainer>
        <StyledButton>
          <StyledBoldText>History:</StyledBoldText>
        </StyledButton>
        <StyledButton onPress={() => setShowRemoveConfirmation(true)}>
          <StyledBoldText>Remove:</StyledBoldText>
        </StyledButton>
        <StyledButton onPress={sendNewCurrency}>
          <StyledBoldText>Update:</StyledBoldText>
        </StyledButton>
        <Modal
          animationType="slide"
          visible={showRemoveConfirmation}
          transparent={true}>
          <ModalContainer>
            <ConfirmationContainer>
              <StyledBoldText>Are you sure: {currency.name}</StyledBoldText>
              <ButtonsContainer>
                {!removing ? (
                  <>
                    <StyledButton onPress={launchRemove}>
                      <StyledBoldText>Remove:</StyledBoldText>
                    </StyledButton>
                    <StyledButton onPress={() => setShowRemoveConfirmation(false)}>
                      <StyledBoldText>Cancel:</StyledBoldText>
                    </StyledButton>
                  </>
                ) : (
                  <StyledButton onPress={cancelRemoving}>
                    <StyledBoldText>Undo:</StyledBoldText>
                  </StyledButton>
                )}
              </ButtonsContainer>
            </ConfirmationContainer>
          </ModalContainer>
        </Modal>
      </ButtonsContainer>
      {isUpdating && <ActivityIndicator />}
    </FormContainer>
  );
};

export default EditCurrencyForm;
