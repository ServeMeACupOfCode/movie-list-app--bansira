import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
