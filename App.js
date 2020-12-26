import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from './camera';
import Image_Picker from './CameraImagePicker';

// =======================================================================

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Camera Screen"
        onPress={() => navigation.navigate('Camera')}
      />
      <Text></Text>
      <Button
        title="Camera With Image Picker"
        onPress={() => navigation.navigate('ImagePicker')}
      />
    </View>
  )
}
// =======================================================================

function CameraScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Camera navigation={navigation} />
    </View>
  )
}


// =======================================================================
function CameraImagePicker() {
  return (
    <View style={{ flex: 1 }}>
      <Image_Picker/>
    </View>
  )
}


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="ImagePicker" component={CameraImagePicker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
