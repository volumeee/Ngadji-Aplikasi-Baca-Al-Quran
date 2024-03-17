import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '../utils/tailwind';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw` bg-bgreen flex-1`}>
      <View style={tw`flex-col justify-around mt-20`}>
        <Text style={tw` text-bblack font-montBold text-8 text-center px-5`}>
          Yuk Mulai Warnai <Text style={tw`text-ggreen`}>Ibadahmu</Text>
        </Text>
        <View style={tw` flex-row justify-center mt-15`}>
          <Image
            source={require('../assets/ngadji.png')}
            style={tw`w-90 h-90`}
          />
        </View>
        <TouchableOpacity
          style={tw`mt-15`}
          onPress={() => navigation.navigate('SignUp')}>
          <LinearGradient
            start={{x: 0.5, y: 0.0}}
            end={{x: 0.5, y: 1.0}}
            colors={['#216869', '#1F2421']}
            style={tw`px-1 py-3 mx-10 rounded-3 items-center`}>
            <Text style={tw`text-bgreen font-montBold text-6`}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={tw`flex-row justify-center gap-2 mt-5`}>
          <Text style={tw`text-bblack font-montSB text-3`}>
            Sudah punya akun?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-bblack font-montBold text-3`}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
