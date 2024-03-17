import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconChevronLeft} from 'tabler-icons-react-native';
import tw from '../utils/tailwind';
import DetailSurahQuran from '../components/DetailSurahQuran';

const QuranDetailScreen = () => {
  const route = useRoute();
  const {surah} = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 bg-bgreen`}>
      <View style={tw`m-4 flex-col`}>
        <View style={tw`flex-row justify-center items-center`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`flex-1`}>
            <IconChevronLeft size={30} color="black" />
          </TouchableOpacity>
          <View style={tw`flex-1.7`}>
            <Text style={tw`font-montBold text-bblack text-5`}>Al-Fatihah</Text>
          </View>
        </View>
        <View>
          <DetailSurahQuran surah={surah} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuranDetailScreen;
