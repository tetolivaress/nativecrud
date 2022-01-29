import React from 'react';
import {View, Text} from 'react-native';
import {CrudStackParams} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import Index from '../components/Index';
import {RedirectToCreate} from '../components/Theme';

interface Props extends StackScreenProps<CrudStackParams, 'IndexScreen'> {}

const IndexScreen = ({navigation}: Props) => {
  console.log(navigation);
  return (
    <View style={{flex: 1}}>
      <Index />
      <RedirectToCreate onPress={() => navigation.navigate('CreateScreen')}>
        <Text>Create</Text>
      </RedirectToCreate>
    </View>
  );
};

export default IndexScreen;
