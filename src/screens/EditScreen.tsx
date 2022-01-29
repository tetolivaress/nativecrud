import React from 'react';
import {View} from 'react-native';
import EditCurrencyForm from '../components/Edit/EditCurrencyForm';
import {StackScreenProps} from '@react-navigation/stack';
import {CrudStackParams} from '../../../recordslike/src/navigator/index';

interface Props extends StackScreenProps<CrudStackParams, 'EditScreen'> {}
const EditScreen = ({route}: Props) => {
  return (
    <View style={{flex: 1}}>
      <EditCurrencyForm currency={route.params} />
    </View>
  );
};

export default EditScreen;
