// Example of Image Picker in React Native
// https://aboutreact.com/example-of-image-picker-in-react-native/
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Platform, PermissionsAndroid, Button, } from 'react-native';
// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



const App = () => {

  const [filePath, setFilePath] = useState([]);

  // ============================== Camera Permisssion ===================================================

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  // ===============================  Storage Permisssion ==================================================

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  // ================ Capture both Image and Video Depend on Type and Save it=================================================================

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('You just cancelled the camera.');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device.');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied.');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };
  // ======================= Choose both Image and Video Depend on Type ==========================================================
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('You just cancelled the gallery.');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device.');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied.');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };
  console.log(filePath.uri)

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: 'data:image/jpeg;base64,' + filePath.data, }} style={styles.imageStyle} /> */}
      <Image source={{ uri: filePath.uri }} style={styles.imageStyle} />
      <Text style={styles.textStyle}>{filePath.uri}</Text>

      <Button title={'Launch Camera for Image'} onPress={() => captureImage('photo')} style={styles.button} />

      <Button title={'Launch Camera for Video'} onPress={() => captureImage('video')} style={styles.button} />

      <Button title={'Choose Image'} onPress={() => chooseFile('photo')} style={styles.button} />

      <Button title={'Choose Video'} onPress={() => chooseFile('video')} style={styles.button} />

    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textStyle: {
    padding: 7,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    marginBottom: 2,
  },
  imageStyle: {
    width: 300,
    height: 400,
    margin: 5,
  },
});