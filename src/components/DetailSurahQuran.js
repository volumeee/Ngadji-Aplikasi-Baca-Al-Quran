import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../utils/tailwind';
import axios from 'axios';

const baseUrl = 'https://quran-api.santrikoding.com/api/surah/';

const DetailSurahQuran = ({surah}) => {
  const [detailSurah, setDetailSurah] = useState(null);

  useEffect(() => {
    const fetchSurahDetail = async () => {
      try {
        const response = await axios.get(baseUrl + surah);
        setDetailSurah(response.data);
      } catch (error) {
        console.error('Error fetching surah detail:', error);
      }
    };

    fetchSurahDetail();
  }, [surah]);

  if (!detailSurah) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={tw`flex-row justify-center items-center mt-5`}>
      <LinearGradient
        start={{x: 1.5, y: 0}}
        end={{x: 0.8, y: 2.3}}
        locations={[0, 0.5, 1]}
        colors={['#80B9A2', '#C5F4CB', '#80B9A2']}
        style={[tw`h-50 w-89 rounded-4 border border-line`, {opacity: 1}]}>
        <View style={tw`flex-col justify-center items-center my-6 ml-4`}>
          <ImageBackground
            source={require('../assets/nomor.png')}
            resizeMode="contain"
            style={tw`h-12 w-12 justify-center items-center`}>
            <Text style={tw`font-montBold text-3.3 text-bblack`}>
              {detailSurah.nomor}
            </Text>
          </ImageBackground>
          <Text style={tw`font-montBold text-bblack text-6`}>
            {detailSurah.nama_latin}
          </Text>
          <Text style={tw`font-montMed text-bblack text-4`}>
            {detailSurah.arti}
          </Text>
          {/* Tampilkan informasi lainnya sesuai kebutuhan */}
        </View>
      </LinearGradient>
    </View>
  );
};

export default DetailSurahQuran;
