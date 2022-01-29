import React from 'react';
import CurrenciesList from './CurrenciesList';
import {CrudStackParams} from '../../../../recordslike/src/navigator/index';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<CrudStackParams> {}

const Index = (props: Props) => {
  return <CurrenciesList />;
};

export default Index;
