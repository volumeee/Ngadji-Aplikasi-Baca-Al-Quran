import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import tw from '../utils/tailwind';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const baseUrl = 'https://quran-api.santrikoding.com/api/surah';

const ListSurahQuran = () => {
  const [surahList, setSurahList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios({
      method: 'GET',
      url: baseUrl,
    }).then(response => {
      const allSurahs = response.data; // Mendapatkan semua objek surah dari respons
      const formattedSurahs = allSurahs.map(surah => ({
        nomor: surah.nomor,
        jumlah_ayat: surah.jumlah_ayat,
        nama_latin: surah.nama_latin,
        nama: surah.nama,
        arti: surah.arti,
      }));
      setSurahList(formattedSurahs);
      setLoading(false); // Menandakan bahwa data sudah selesai dimuat
    });
  }, []);

  const handleQuran = surah => {
    console.log(surah.nomor);
    navigation.navigate('QuranDetail', {surah: surah.nomor});
  };

  if (loading) {
    return <Loader />; // Menampilkan loader saat data masih dimuat
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={surahList}
      renderItem={({item}) => <Item surah={item} onPress={handleQuran} />}
      keyExtractor={item => item.nomor.toString()}
      style={tw`mb-70 mt-5`}
    />
  );
};

const Item = ({surah, onPress}) => {
  return (
    <Pressable onPress={() => onPress(surah)}>
      <View
        style={tw` py-4 mx-2 flex-row items-center border-b border-linelist`}>
        <ImageBackground
          source={require('../assets/nomor.png')}
          resizeMode="contain"
          style={tw`h-12 w-12 justify-center items-center`}>
          <Text style={tw`font-montBold text-3.3 text-bblack`}>
            {surah.nomor}
          </Text>
        </ImageBackground>
        <View style={tw`flex-col ml-3`}>
          <Text style={tw`font-montBold text-5 text-bblack`}>
            {surah.nama_latin}
          </Text>
          <View style={tw`flex-row`}>
            <Text style={tw`font-montMed text-3 text-bblack`}>
              {surah.arti}{' '}
            </Text>
            <Text style={tw`font-montMed text-3 text-bblack`}>
              - {surah.jumlah_ayat} ayat
            </Text>
          </View>
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`font-montBold text-5 text-bblack`}>{surah.nama}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const Loader = () => (
  <ContentLoader
    backgroundColor="#A8DEB9"
    foregroundColor="#B5D0BA"
    viewBox="0 0 500 500"
    height={475}
    width={400}>
    <Circle cx="70.2" cy="73.2" r="41.3" />
    <Rect x="129.9" y="29.5" width="125.5" height="17" />
    <Rect x="129.9" y="64.7" width="296" height="17" />
    <Rect x="129.9" y="97.8" width="253.5" height="17" />

    <Circle cx="70.7" cy="243.5" r="41.3" />
    <Rect x="130.4" y="199.9" width="125.5" height="17" />
    <Rect x="130.4" y="235" width="296" height="17" />
    <Rect x="130.4" y="268.2" width="253.5" height="17" />

    <Circle cx="70.7" cy="412.7" r="41.3" />
    <Rect x="130.4" y="369" width="125.5" height="17" />
    <Rect x="130.4" y="404.2" width="296" height="17" />
    <Rect x="130.4" y="437.3" width="253.5" height="17" />
  </ContentLoader>
);

export default ListSurahQuran;
