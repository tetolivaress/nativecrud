import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useForm} from '../../hooks/useForm';
import {StyledButton, StyledInput, FormContainer} from '../Theme/index';
import {useFirebase} from '../../hooks/useFirebase/index';
import {useNavigation} from '@react-navigation/core';

const CurrencyForm = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const navigation = useNavigation();
  const {form, handleForm} = useForm({name: '', amount: ''});
  const {AddCurrency} = useFirebase();

  const sendNewCurrency = async () => {
    try {
      setIsUpdating(true);
      await AddCurrency(form.name, form.amount);
      navigation.navigate('IndexScreen');
    } catch (error) {
      setIsUpdating(false);
      console.log(error);
    }
  };

  return (
    <FormContainer>
      <StyledInput
        placeholder="name"
        onChangeText={value => handleForm(value, 'name')}
        value={form.name}
        placeholderTextColor="#000"
      />
      <StyledInput
        placeholder="amount"
        onChangeText={value => handleForm(value, 'amount')}
        value={form.amount}
        keyboardType="numeric"
        placeholderTextColor="#000"
      />
      <StyledButton onPress={sendNewCurrency} />
      {isUpdating && <ActivityIndicator />}
    </FormContainer>
  );
};

export default CurrencyForm;
