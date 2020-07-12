import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import {metrics} from 'src/themes';
import FastImage from 'react-native-fast-image';
import {Photo} from 'src/models';

interface ProfilePhotoProps {
  data: Photo;
  imageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
  onDelete?: () => void;
  onPress?: () => void;
}

const CLOSE_IMAGE = require('./ic_close.png');
export const ProfilePhoto = ({data, ...props}: ProfilePhotoProps) => {
  return (
    <View style={[root, props.containerStyle]}>
      <FastImage
        source={{
          uri: data.url,
        }}
        style={[imageStyle, props.imageStyle]}
        resizeMode={FastImage.resizeMode.cover}
      />
      <TouchableOpacity onPress={props.onDelete} style={closeContainerStyle}>
        <Image source={CLOSE_IMAGE} style={closeImageStyle} />
      </TouchableOpacity>
    </View>
  );
};

const containerWidth = metrics.screenWidth / 3.6;
const containerHeight = containerWidth * 1.5;
const root: ViewStyle = {
  width: containerWidth,
  height: containerHeight,
};

const imageStyle: ImageStyle = {
  resizeMode: 'cover',
  width: containerWidth,
  height: containerHeight,
  borderRadius: 15,
};

const closeImageStyle: ImageStyle = {
  width: 15,
  height: 15,
  resizeMode: 'contain',
};

const closeContainerStyle: ViewStyle = {
  position: 'absolute',
  bottom: -10,
  right: -10,
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 30,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.29,
  shadowRadius: 4.65,

  elevation: 7,
};
