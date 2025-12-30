import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PaywallScreen, MeditationsScreen } from '../screens';

export type RootStackParamList = {
  Meditations: undefined;
  Paywall: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Meditations"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        presentation: 'modal',
      }}
    >
      <Stack.Screen 
        name="Meditations" 
        component={MeditationsScreen}
        options={{
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="Paywall" 
        component={PaywallScreen}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  );
};
