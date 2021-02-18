import React, { Component } from 'react';
import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const UNKNOWN_BARCODE_TYPE:string = "UNKNOWN_FORMAT";

class Camera extends Component {
    camera: RNCamera | null = null;
    scannedCodes = new Map<string, any>();

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={(ref: RNCamera) => { this.camera = ref; }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        if (barcodes && barcodes.length > 0 ) {
                            if (barcodes[0].type != UNKNOWN_BARCODE_TYPE && !this.scannedCodes.has(barcodes[0].data)) {
                                // new barcode
                                console.log(barcodes);
                                this.scannedCodes.set(barcodes[0].data, {});
                            }
                        }
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }

    takePicture = async (): Promise<void> => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#0ff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
});

export default Camera;