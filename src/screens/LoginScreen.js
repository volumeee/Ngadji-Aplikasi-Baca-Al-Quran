import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {IconChevronLeft} from 'tabler-icons-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import tw from '../utils/tailwind';
import LinearGradient from 'react-native-linear-gradient';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from '../config/firebase';
import Snackbar from 'react-native-snackbar';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!email || !password) {
      Snackbar.show({
        text: 'Please fill in all fields',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log('got error', err.code);
      switch (err.code) {
        case 'auth/invalid-email':
          Snackbar.show({
            text: 'Please enter a valid email address',
            duration: Snackbar.LENGTH_SHORT,
          });
          break;
        case 'auth/invalid-credential':
          Snackbar.show({
            text: 'Please enter a valid password',
            duration: Snackbar.LENGTH_SHORT,
          });
          break;
        default:
          Snackbar.show({
            text: 'An error occurred. Please try again later',
            duration: Snackbar.LENGTH_SHORT,
          });
          break;
      }
    }
  };

  const handleForgotPassword = async () => {
    await sendPasswordResetEmail(auth, email)
      .then(() =>
        Snackbar.show({
          text: 'Password reset sent to email',
          duration: Snackbar.LENGTH_SHORT,
        }),
      )
      .catch(() =>
        Snackbar.show({
          text: 'Error while sending password reset',
          duration: Snackbar.LENGTH_SHORT,
        }),
      );
  };

  return (
    <View style={tw`flex-1 bg-bgreen`}>
      <SafeAreaView style={tw`flex mt-3`}>
        <View style={tw`flex-row justify-start mx-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LinearGradient
              start={{x: 0.5, y: 0.0}}
              end={{x: 0.5, y: 1.0}}
              colors={['#216869', '#1F2421']}
              style={tw`p-1.5 rounded-tr-2xl rounded-bl-2xl`}>
              <IconChevronLeft size={30} color="#C5F4CB" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-center`}>
          <Image
            source={require('../assets/login.png')}
            style={tw`h-60 w-60`}
          />
        </View>
      </SafeAreaView>
      <View style={tw`flex-1 bg-white rounded-t-10 mt-2`}>
        <View style={tw`flex-col mx-10 mt-8`}>
          <View style={tw`flex`}>
            <Text style={tw`text-bblack font-montSB ml-3 mb-1`}>
              Email address
            </Text>
            <TextInput
              style={tw`p-3 bg-slate-100 rounded-3 text-bblack font-montMed`}
              value={email}
              onChangeText={value => setEmail(value)}
              placeholder="Enter your email"
            />
          </View>
          <View style={tw`flex mt-5`}>
            <Text style={tw`text-bblack font-montSB ml-3 mb-1`}>Password</Text>
            <TextInput
              style={tw`p-3 bg-slate-100 rounded-3 text-bblack font-montMed`}
              secureTextEntry={true}
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder="Enter your password"
            />
          </View>
          <View style={tw`flex-row justify-end mt-1 mr-2`}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={tw` font-montSB text-3 text-bblack`}>
                lupa password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col mt-10`}>
            <TouchableOpacity onPress={handleSubmit}>
              <LinearGradient
                start={{x: 0.5, y: 0.0}}
                end={{x: 0.5, y: 1.0}}
                colors={['#216869', '#1F2421']}
                style={tw`py-2.5 rounded-3 items-center`}>
                <Text style={tw`text-bgreen font-montBold text-6`}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={tw`flex-row justify-center mt-5`}>
              <Text style={tw`font-montSB text-bblack text-4`}>Or</Text>
            </View>
          </View>
          <View style={tw`flex-row justify-center gap-10`}>
            <TouchableOpacity style={tw`p-2 bg-slate-100 rounded-2xl mt-5`}>
              <Image
                source={require('../assets/google.png')}
                style={tw`h-10 w-10`}
              />
            </TouchableOpacity>
            <TouchableOpacity style={tw`p-2 bg-slate-100 rounded-2xl mt-5`}>
              <Image
                source={require('../assets/apple.png')}
                style={tw`h-10 w-10`}
              />
            </TouchableOpacity>
            <TouchableOpacity style={tw`p-2 bg-slate-100 rounded-2xl mt-5`}>
              <Image
                source={require('../assets/facebook.png')}
                style={tw`h-10 w-10`}
              />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row justify-center gap-2 mt-5`}>
            <Text style={tw`text-bblack font-montSB text-3`}>
              Belum punya akun?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={tw`text-bblack font-montBold text-3`}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
