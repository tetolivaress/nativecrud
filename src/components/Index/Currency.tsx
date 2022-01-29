import React from 'react';
import {StyledText, StyledCurrency, StyledBoldText} from '../Theme';
import {CurrencyDetails, CurrencyToEdit} from '../../interfaces/Currencies';
import {StackScreenProps} from '@react-navigation/stack';
import {CrudStackParams} from '../../../../recordslike/src/navigator/index';
import {useNavigation} from '@react-navigation/core';
import {getLastKey} from '../../utils/objects';

interface Props extends StackScreenProps<CrudStackParams, 'EditScreen'> {
  currency: CurrencyDetails;
  name: string;
}

const Currency = ({currency, name}: Props) => {
  const {navigate} = useNavigation<Props>();
  const lastDateKey = getLastKey(currency);
  const lasthourKey: string = getLastKey(currency[lastDateKey]);
  const lastCurrencyRegister = currency[lastDateKey][lasthourKey];

  const currencyDetails: CurrencyToEdit = {
    hour: lasthourKey,
    date: lastDateKey,
    name: name,
    amount: lastCurrencyRegister.amount,
  };

  return (
    <StyledCurrency onPress={() => navigate('EditScreen', currencyDetails)}>
      <StyledBoldText>{name}</StyledBoldText>
      <StyledText>{lastCurrencyRegister.amount}</StyledText>
    </StyledCurrency>
  );
};

export default Currency;
