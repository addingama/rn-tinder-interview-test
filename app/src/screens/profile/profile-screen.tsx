import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Grid, ProfilePhoto} from 'src/components/atoms';
import {Member, Photo, PhotoResponse} from 'src/models';
import {Api} from 'src/services/api';
import {DEFAULT_API_CONFIG} from 'src/services/api/api-config';

const MEMBER_ID = 1;

export const ProfileScreen = () => {
  let api: Api = null;
  const [member, setMember] = useState<Member>({});
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    api = new Api();
    await api.setup(DEFAULT_API_CONFIG);
    await fetchMember();
    await fetchPhotos();
  };

  const fetchMember = async () => {
    const response = await api.getMember(MEMBER_ID);
    await setMember(response);
  };

  const fetchPhotos = async () => {
    const response: PhotoResponse = await api.getPhotos(member.id);
    setPhotos(response);
  };

  const renderItem = ({item}: {item: Photo}) => {
    return <ProfilePhoto data={item} />;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Grid
        numColumns={3}
        data={photos}
        renderItem={renderItem}
        marginExternal={8}
        marginInternal={8}
        contentContainerStyle={{flexGrow: 1}}
      />
    </SafeAreaView>
  );
};
