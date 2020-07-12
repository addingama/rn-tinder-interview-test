import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Grid, ProfilePhoto} from 'src/components/atoms';
import {Member, Photo, PhotoResponse} from 'src/models';
import {Api} from 'src/services/api';
import {DEFAULT_API_CONFIG} from 'src/services/api/api-config';

const MEMBER_ID = 1;

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
        contentContainerStyle={{flexGrow: 1}}
      />
    </SafeAreaView>
  );
};
