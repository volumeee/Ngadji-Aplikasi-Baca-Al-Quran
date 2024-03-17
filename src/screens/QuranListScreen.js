import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '../utils/tailwind';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {IconChevronLeft, IconSearch} from 'tabler-icons-react-native';
import ListSurahQuran from '../components/ListSurahQuran';

const QuranListScreen = () => {
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
            <Image
              source={require('../assets/ngadjiheader.png')}
              style={tw`h-4.5 w-22`}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={tw`flex-row justify-center items-center mt-5 gap-3`}>
          <Pressable>
            <Text style={tw`text-ggreen text-4 border-b-2 font-montBold`}>
              Surah
            </Text>
          </Pressable>
          <Pressable>
            <Text style={tw`text-bblack text-4 font-montBold`}>Juzz</Text>
          </Pressable>
        </View>
        <View style={tw`mx-10 mt-5`}>
          <LinearGradient
            start={{x: 0.5, y: 0.0}}
            end={{x: 0.5, y: 2.0}}
            colors={['#B4F6BC', '#4EA97F']}
            style={tw`px-5 rounded-full flex-row items-center`}>
            <TextInput
              placeholder="search surah..."
              style={tw`text-ggreen font-montMed flex-1`}></TextInput>
            <IconSearch size={30} color="#216869" />
          </LinearGradient>
        </View>
        <View>
          <ListSurahQuran />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuranListScreen;
