import React, {useEffect} from 'react';
import {View} from 'react-native';
import {CrudStackParams} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Text} from '../components/Theme';

interface Props extends StackScreenProps<CrudStackParams, 'ShowScreen'> {}

const ShowScreen = ({navigation, route}: Props) => {
  const user = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: user.name,
      headerBackTitle: 'kkkk',
    });
  }, [user, navigation]);

  return (
    <View style={{flex: 1}}>
      <Button>
        <Text>{JSON.stringify(user, null, 4)}</Text>
      </Button>
    </View>
  );
};

export default ShowScreen;
