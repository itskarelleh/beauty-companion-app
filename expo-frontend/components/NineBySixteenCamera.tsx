import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { onboardingStyles } from './onboarding';
import { useOnboarding } from '@/libs/OnboardingProvider';
import { StyledButton } from './common/StyledButton';
import { Image } from 'expo-image'

function convertBase64ToFile(base64: string, fileName: string, mimeType: string): File {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}

function randomFileName(base64: string): string {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  const extension = base64.split(';')[0].split('/')[1]; // Extracts the file extension from the base64 string
  return `image_${timestamp}_${randomNum}.${extension}`;
}

export default function NineBySixteenCamera({ handleImages }: { handleImages: any }) {
  
  const { state } = useOnboarding();
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [disabled, setDisabled] = useState(false);
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
        <StyledButton onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current?.takePictureAsync();

        const file : File = convertBase64ToFile(
          photo.base64, 
          randomFileName(photo.base64), 
          'image/jpeg');

        console.log(file)
        handleImages(file);

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
            <TouchableOpacity disabled={disabled}
            style={[styles.shootButton, disabled && styles.disabled]} 
            onPress={handleTakePhoto}>
              <Image style={styles.shootButtonInner} source={require('@/assets/images/camera-button.svg')} />
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
  ...onboardingStyles,
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
    position: 'relative',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // padding: 10
  },
  button: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  aspectRatio: {
    aspectRatio: 1 / 1
  },
  shootButton: {
    flex: 1,
    height: 70,
    width: 70,
  },
  shootButtonInner: {
    width: 50,
    height: 50,
  },
  disabled: {
    opacity: 0.5,
  },
});