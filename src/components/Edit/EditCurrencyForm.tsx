import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {ActivityIndicator} from 'react-native';
import {CurrencyToEdit} from '../../interfaces/Currencies';
import {
  FormContainer,
  StyledInput,
  StyledButton,
  StyledBoldText,
  ButtonsContainer,
} from '../Theme/index';
import {useForm} from '../../hooks/useForm';
import {useFirebase} from '../../hooks/useFirebase';
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal';

export interface Props {
  currency: CurrencyToEdit;
}

const EditCurrencyForm = ({currency}: Props) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [showRemoveConfirmation, setShowRemoveConfirmation] =
    useState<boolean>(false);

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
      </ButtonsContainer>
      <DeleteConfirmationModal
        remove={remove}
        message={`Are you sure yo want delete this currency: ${currency.name}`}
        open={showRemoveConfirmation}
        undoMessage={`undo remove: ${currency.name}`}
        toggle={() => setShowRemoveConfirmation(!showRemoveConfirmation)}
      />
      {isUpdating && <ActivityIndicator />}
    </FormContainer>
  );
};

export default EditCurrencyForm;
