import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Grid, ProfilePhoto} from 'src/components/atoms';
import {Member, Photo, PhotoResponse} from 'src/models';
import {Api} from 'src/services/api';
import {DEFAULT_API_CONFIG} from 'src/services/api/api-config';

const MEMBER_ID = 1;

const DEFAULT_ADDED_PHOTO: Photo = {
  "id": "11111113",
  "url": "https://media.king5.com/assets/KING/images/156daac9-f162-4c82-bb78-6edc4225d9ae/156daac9-f162-4c82-bb78-6edc4225d9ae_750x422.jpg",
  "width": 750,
  "height": 422,
  "centerX": 349,
  "centerY": 203
}

export const ProfileScreen = () => {
  let api: Api = new Api(DEFAULT_API_CONFIG);
  const [member, setMember] = useState<Member>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    await api.setup();
    await fetchMember();
    await fetchPhotos();
  };

  const fetchMember = async () => {
    try {
      setLoading(true);
      const response = await api.getMember(MEMBER_ID);
      console.log(response)
      setMember(response);
      fetchPhotos(response.id);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const fetchPhotos = async (id: number) => {
    if (id) {
      const response: PhotoResponse = await api.getPhotos(id);
      setPhotos(response);
    }
  };

  const deletePhoto = (index: number) => {
    let newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const addPhoto = () => {
    let newPhotos = [...photos, DEFAULT_ADDED_PHOTO];
    setPhotos(newPhotos); 
  }

  const renderItem = ({item, index}: {item: Photo; index: number}) => {
    return <ProfilePhoto data={item} onDelete={() => deletePhoto(index)} />;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Grid
        refreshing={loading}
        onRefresh={setup}
        numColumns={3}
        data={photos}
        renderItem={renderItem}
        marginExternal={8}
        marginInternal={20}
        contentContainerStyle={{flexGrow: 1, paddingVertical: 20}}
      />
      <TouchableOpacity style={addButtonStyle} onPress={addPhoto}>
        <Text style={addTextStyle}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const addTextStyle: TextStyle = {
  fontSize: 30,
  color: 'red',
}


const addButtonStyle: ViewStyle = {
  backgroundColor: 'white',
  width: 50,
  height: 50,
  alignSelf: 'flex-end',
  marginRight: 10,
  alignItems: 'center',
  justifyContent: 'center',
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
