import React from 'react';
import {CurrencyToEdit} from '../../interfaces/Currencies';
import EditCurrencyForm from '../shared/CurrencyForm';

export interface Props {
  currency: CurrencyToEdit;
}

const Edit = ({currency}: Props) => {
  return <EditCurrencyForm currency={currency} />;
};

export default Edit;
