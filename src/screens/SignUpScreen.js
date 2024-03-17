import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {IconChevronLeft} from 'tabler-icons-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import tw from '../utils/tailwind';
import LinearGradient from 'react-native-linear-gradient';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../config/firebase';
import Snackbar from 'react-native-snackbar';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!email || !password || !username) {
      Snackbar.show({
        text: 'Please fill in all fields',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });
      const updatedUser = auth.currentUser;

      console.log('User successfully registered:', updatedUser);
    } catch (err) {
      console.log('got error', err.code);
      switch (err.code) {
        case 'auth/invalid-email':
          Snackbar.show({
            text: 'Please enter a valid email address',
            duration: Snackbar.LENGTH_SHORT,
          });
          break;
        case 'auth/weak-password':
          Snackbar.show({
            text: 'Please enter a strong password',
            duration: Snackbar.LENGTH_SHORT,
          });
          break;
        // Add more cases for other error types if needed
        default:
          Snackbar.show({
            text: 'An error occurred. Please try again later',
            duration: Snackbar.LENGTH_SHORT,
          });
          break;
      }
    }
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
            source={require('../assets/signup.png')}
            style={tw`h-40 w-40`}
          />
        </View>
      </SafeAreaView>
      <View style={tw`flex-1 bg-white rounded-t-10 mt-2`}>
        <View style={tw`flex-col mx-10 mt-8`}>
          <View style={tw`flex`}>
            <Text style={tw`text-bblack font-montSB ml-3 mb-1`}>Username</Text>
            <TextInput
              style={tw`p-3 bg-slate-100 rounded-3 text-bblack font-montMed`}
              value={username}
              onChangeText={value => setUsername(value)}
              placeholder="Enter your username"
            />
          </View>
          <View style={tw`flex mt-5`}>
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
          <View style={tw`flex-col mt-10`}>
            <TouchableOpacity onPress={handleSubmit}>
              <LinearGradient
                start={{x: 0.5, y: 0.0}}
                end={{x: 0.5, y: 1.0}}
                colors={['#216869', '#1F2421']}
                style={tw`py-2.5 rounded-3 items-center`}>
                <Text style={tw`text-bgreen font-montBold text-6`}>SignUp</Text>
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
              Sudah punya akun?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={tw`text-bblack font-montBold text-3`}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
