import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NineBySixteenCamera({ handleImages }: { handleImages: any }) {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    checkCameraTypes();
  }, [permission]);

  async function checkCameraTypes() {
    if (permission?.granted) {
      try {
        setHasMultipleCameras(true);
      } catch (error) {
        console.error('Error checking camera types:', error);
        setHasMultipleCameras(true);
      }
    }
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current?.takePictureAsync();

        console.log("photo", photo);
        if (photo?.base64) {
          handleImages(photo);
        }
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    }
  }

  return (
    <View style={styles.container} id="camera-container">
      <CameraView id="camera"
        ref={cameraRef}
        videoQuality='2160p'
        style={[styles.camera, styles.aspectRatio]}
        facing={facing}
      >
        {hasMultipleCameras && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.shootButton} onPress={handleTakePhoto}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    width: '100%',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  aspectRatio: {
    aspectRatio: 9 / 16,
  },
  shootButton: {
    flex: 1,
    height: 100,
    width: 100,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});