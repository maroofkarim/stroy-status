import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Progress from 'react-native-progress';
export const Home = () => {
  const [image, setImage] = useState('');
  const [loading, setIsloading] = useState(false);
  const [count, setCount] = useState(0);
  const [progressBarValue, setProgressBarValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgressBarValue(prev => {
        if (prev >= 1) {
          clearInterval(intervalId);
          setIsloading(false);
          return 1;
        } else {
          return prev + 0.1;
        }
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, [progressBarValue, loading]);

  const imageLaunch = async () => {
    const option = {
      mediaType: 'photo',
      saveToPhotos: true,
    };
    try {
      await ImagePicker.launchImageLibrary(option, res => {
        console.log('image res', res);
        res.assets?.map(val => {
          setImage(val.uri);
          console.log('here is setimage', image);
        });
        if (res.didCancel) {
        } else if (res.errorCode) {
          alert('Error in network');
        } else {
          const source = {uri: res.assets};
        }
      });
    } catch (error) {
      console.log('error is here in launch image', error);
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <>
      {loading ? (
        <Animated.View style={style.box}>
          <Progress.Bar
            style={{position: 'absolute', top: 1, zIndex: 1}}
            progress={progressBarValue}
            width={390}
            color={'black'}
            borderWidth={0}
          />
          <TouchableOpacity
            style={style.cancleButton}
            onPress={() => {
              setIsloading(false);
            }}>
            <Text style={style.cancleIcon}>X</Text>
          </TouchableOpacity>
          <GestureRecognizer
            config={config}
            onSwipeDown={() => {
              setIsloading(false);
            }}>
            <Image style={{height: 700, width: 400}} source={{uri: image}} />
            <TextInput />
          </GestureRecognizer>
        </Animated.View>
      ) : (
        <View style={style.mainView}>
          {}
          <TouchableOpacity
            onPress={() => {
              setProgressBarValue(0);
              image ? setIsloading(true) : imageLaunch();
            }}>
            <View style={style.innerButtonView}>
              {image ? (
                <View style={false ? style.borderColor : style.borderUNColor}>
                  <Image
                    style={style.borderAnimationStyle}
                    source={{uri: image}}
                  />
                </View>
              ) : (
                <Text>status</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButtonView: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancleButton: {
    height: 40,
    width: 25,
    position: 'absolute',
    zIndex: 1,
    left: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancleIcon: {fontSize: 30, color: 'white'},
  animationBorder: {
    borderWidth: 2,
    borderRadius: 50,
  },
  borderAnimationStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  box: {
    marginTop: 50,
  },
  borderColor: {
    borderWidth: 4,
    borderRadius: 60,
    borderColor: 'red',
  },
  borderUNColor: {
    borderWidth: 4,
    borderRadius: 60,
    borderColor: 'grey',
  },
});
