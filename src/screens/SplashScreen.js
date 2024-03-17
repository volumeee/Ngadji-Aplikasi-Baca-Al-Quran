import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '../utils/tailwind';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <SafeAreaView style={tw` bg-bgreen flex-1`}>
      <View style={tw` flex-1 justify-center items-center`}>
        <Image source={require('../assets/ngadji.png')} style={tw`w-70 h-70`} />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
