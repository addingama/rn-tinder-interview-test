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
import { Photo } from 'src/models';

interface ProfilePhotoProps {
  data: Photo;
  imageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
  onDelete?: () => void;
  onPress?: () => void;
}

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
    </View>
  );
};

const containerWidth = metrics.screenWidth / 3.6;
const containerHeight = containerWidth * 1.5
const root: ViewStyle = {
  width: containerWidth,
  height: containerHeight,
};

const imageStyle: ImageStyle = {
  resizeMode: 'cover',
  width: containerWidth,
  height: containerHeight,
  borderRadius: 15
};
