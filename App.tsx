import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import IndexScreen from './src/screens/IndexScreen';
import EditScreen from './src/screens/EditScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import { CurrencyToEdit } from './src/interfaces/Currencies';

export type CrudStackParams = {
  IndexScreen: undefined;
  ShowScreen: {
    id: number;
    name: string;
  };
  EditScreen: CurrencyToEdit;
  CreateScreen: undefined;
};

const StackNavigator = createStackNavigator<CrudStackParams>();

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <StackNavigator.Navigator>
          <StackNavigator.Screen name="IndexScreen" component={IndexScreen} />
          <StackNavigator.Screen name="EditScreen" component={EditScreen} />
          <StackNavigator.Screen name="ShowScreen" component={ShowScreen} />
          <StackNavigator.Screen name="CreateScreen" component={CreateScreen} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
