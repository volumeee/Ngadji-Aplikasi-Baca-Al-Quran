import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Switch,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import Clock from '../components/customAnalogClock';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth} from '../config/firebase';
import BackgroundService from 'react-native-background-actions';
import tw from '../utils/tailwind';
import {fetchTodoIsEnabled, saveTodoIsEnabled} from '../hooks/useTodo';
import useAuth from '../hooks/useAuth';
import {useTime} from '../helper/time';
import {checkWaktuSholat, waktuSholat} from '../components/waktuSholat';
import playAdzan from '../components/alarmSholat';

const HomeScreen = () => {
  const [switchIsEnabled, setSwitchIsEnabled] = useState(false);
  const [todoIsEnabled, setTodoIsEnabled] = useState({
    shubuh: false,
    dzuhur: false,
    ashar: false,
    maghrib: false,
    isya: false,
    alarm: false,
  });
  const [isTodoLoaded, setIsTodoLoaded] = useState(false);
  const netInfo = useNetInfo();
  const {user} = useAuth();
  const [nextPrayer, setNextPrayer] = useState({nama: '', waktu: ''});
  const currentTime = useTime();
  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(100), time));

  useEffect(() => {
    const nextPrayerInfo = checkWaktuSholat(currentTime, waktuSholat);
    if (nextPrayerInfo && nextPrayerInfo.nama && nextPrayerInfo.waktu) {
      setNextPrayer(nextPrayerInfo);
    }
  }, [currentTime]);

  useEffect(() => {
    if (switchIsEnabled) {
      const veryIntensiveTask = async taskDataArguments => {
        const {delay} = taskDataArguments;
        await new Promise(async resolve => {
          for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(i);
            await sleep(delay);
            // console.log(
            //   `Current time: ${currentTime.hours}:${currentTime.minutes}`,
            // );
            if (currentTime && currentTime.hours && currentTime.minutes) {
              switch (`${currentTime.hours}:${currentTime.minutes}`) {
                case '04:40':
                  console.log('adzan shubuh berkumandang');
                  playAdzan();
                  break;
                case '12:02':
                  console.log('adzan dzuhur berkumandang');
                  playAdzan();
                  break;
                case '15:10':
                  console.log('adzan ashar berkumandang');
                  playAdzan();
                  break;
                case '18:06':
                  console.log('adzan maghrib berkumandang');
                  playAdzan();
                  break;
                case '19:06':
                  console.log('adzan isya berkumandang');
                  playAdzan();
                  break;
                default:
                  break;
              }
            }
          }
        });
      };

      const options = {
        taskName: 'Alarm',
        taskTitle: 'Alarm Adzan',
        taskDesc: 'status alarm menyala',
        taskIcon: {
          name: 'ic_launcher',
          type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'ngadji://chat/jane',
        parameters: {
          delay: 1000,
        },
      };

      BackgroundService.start(veryIntensiveTask, options);
    } else {
      BackgroundService.stop();
    }
  }, [switchIsEnabled, currentTime.hours, currentTime.minutes]);

  useEffect(() => {
    const fetchData = async () => {
      const todoIsEnabledData = await fetchTodoIsEnabled();
      if (todoIsEnabledData) {
        setTodoIsEnabled(todoIsEnabledData);
        setSwitchIsEnabled(todoIsEnabledData.alarm);
      }
      setIsTodoLoaded(true);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!netInfo.isConnected) {
      Snackbar.show({
        text: 'Internet connection lost',
        duration: Snackbar.LENGTH_INDEFINITE,
      });
    } else {
      Snackbar.dismiss();
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    if (isTodoLoaded) {
      saveTodoIsEnabled(todoIsEnabled);
    }
  }, [todoIsEnabled, isTodoLoaded]);

  const toggleSwitch = () => {
    const newAlarmValue = !todoIsEnabled.alarm;
    setSwitchIsEnabled(newAlarmValue);
    setTodoIsEnabled(previousState => ({
      ...previousState,
      alarm: newAlarmValue,
    }));
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleHistory = async () => {
    console.log('riwayat bacaaan');
  };

  const handleTodo = key => {
    setTodoIsEnabled(previousState => ({
      ...previousState,
      [key]: !previousState[key],
    }));
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 bg-bgreen`}>
      <View style={tw`flex-col m-4`}>
        <View style={tw`flex-row`}>
          <View style={tw`flex-1 justify-center items-start`}>
            <Image
              source={require('../assets/ngadjiheader.png')}
              style={tw`h-4.5 w-22`}
              resizeMode="contain"
            />
          </View>
          <View style={tw`flex-row`}>
            <View style={tw`flex-col justify-center items-end`}>
              <Text style={tw` font-montMed text-3 text-bblack`}>
                Assalamualikum 🤗
              </Text>
              {user && user.displayName ? (
                <Text style={tw` font-montBold text-3.3 text-bblack`}>
                  {user.displayName}
                </Text>
              ) : (
                <Text style={tw` font-montBold text-3.3 text-bblack`}>
                  User
                </Text>
              )}
            </View>
            <View style={tw`flex ml-2`}>
              <Image
                source={require('../assets/profile.png')}
                style={tw`rounded-full h-10 w-10 border border-black`}
              />
            </View>
          </View>
        </View>
        <ScrollView
          style={tw` mb-10`}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={tw`flex-row items-center justify-center mx-2 mt-12`}>
            <View style={tw`flex-col items-center flex-grow-1 mr-4`}>
              <TouchableOpacity
                onPress={() => navigation.navigate('QuranList')}>
                <LinearGradient
                  start={{x: 0.5, y: 0.0}}
                  end={{x: 0.5, y: 1.0}}
                  colors={['#49A078', '#216869']}
                  style={tw`p-4 rounded-3`}>
                  <Image
                    source={require('../assets/icons/quran.png')}
                    style={tw`h-7 w-7`}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </TouchableOpacity>
              <Text style={tw`font-montMed text-3 mt-2 text-bblack`}>
                Al-Quran
              </Text>
            </View>
            <View style={tw`flex-col items-center flex-grow-1 mr-1`}>
              <TouchableOpacity>
                <LinearGradient
                  start={{x: 0.5, y: 0.0}}
                  end={{x: 0.5, y: 1.0}}
                  colors={['#216869', '#1F2421']}
                  style={tw`p-4 rounded-3`}>
                  <Image
                    source={require('../assets/icons/kitab.png')}
                    style={tw`h-7 w-7`}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </TouchableOpacity>
              <Text style={tw`font-montMed text-3 mt-2 text-bblack`}>
                Doa-doa
              </Text>
            </View>
            <View style={tw`flex-col items-center flex-grow-1`}>
              <TouchableOpacity>
                <LinearGradient
                  start={{x: 0.5, y: 0.0}}
                  end={{x: 0.5, y: 1.0}}
                  colors={['#216869', '#1F2421']}
                  style={tw`p-4 rounded-3`}>
                  <Image
                    source={require('../assets/icons/sajadah.png')}
                    style={tw`h-7 w-7`}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </TouchableOpacity>
              <Text style={tw`font-montMed text-3 mt-2 text-bblack`}>
                Jadwal sholat
              </Text>
            </View>
            <View style={tw`flex-col items-center flex-grow-1`}>
              <TouchableOpacity>
                <LinearGradient
                  start={{x: 0.5, y: 0.0}}
                  end={{x: 0.5, y: 1.0}}
                  colors={['#216869', '#1F2421']}
                  style={tw`p-4 rounded-3`}>
                  <Image
                    source={require('../assets/icons/kabah.png')}
                    style={tw`h-7 w-7`}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </TouchableOpacity>
              <Text style={tw`font-montMed text-3 mt-2 text-bblack`}>
                Arah kiblat
              </Text>
            </View>
          </View>
          <View style={tw`flex-row justify-center mt-6`}>
            <LinearGradient
              start={{x: 1.5, y: 0}}
              end={{x: 0.8, y: 2.3}}
              locations={[0, 0.5, 1]}
              colors={['#80B9A2', '#C5F4CB', '#80B9A2']}
              style={[
                tw`h-50 w-89 rounded-4 border border-line`,
                {opacity: 1},
              ]}>
              <View style={tw`absolute flex-col justify-center my-6 ml-4`}>
                <View style={tw` flex-row gap-1`}>
                  <Image
                    source={require('../assets/icons/book.png')}
                    resizeMode={'contain'}
                    style={tw`h-5 w-5`}
                  />
                  <Text style={tw`text-bblack font-montSB text-3.3`}>
                    Terakhir dibaca
                  </Text>
                </View>
                <Pressable onPress={handleHistory}>
                  <Text style={tw`text-ggreen font-montBold text-7`}>
                    Al-Fatihah
                  </Text>
                  <Text style={tw` font-montBold text-ggreen text-4`}>
                    Ayat 1
                  </Text>
                  <View style={tw`flex-row mt-5 items-end`}>
                    <Text style={tw`font-montBold text-bblack text-5`}>
                      18.00{' '}
                    </Text>
                    <Text style={tw` font-montMed text-bblack text-3.3`}>
                      05/03/2024
                    </Text>
                  </View>
                  <Text style={tw` font-montMed text-bblack text-3.3`}>
                    Lanjut baca...
                  </Text>
                </Pressable>
              </View>
            </LinearGradient>
            <View
              style={tw`absolute items-end justify-center h-50 w-9 inset-x-79`}>
              <Image
                source={require('../assets/soleh.png')}
                style={tw`h-40 w-40`}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={tw`flex-row items-center mt-3 ml-5`}>
            <View style={tw`flex-col`}>
              <Text style={tw` font-montBold text-4 text-bblack`}>
                Alarm Adzan
              </Text>
              <Text style={tw`font-montMed text-bblack text-3 -my-1`}>on</Text>
            </View>
            <View style={tw`flex-1 mt-1 mr-4`}>
              <Switch
                trackColor={{false: '#3F4B42', true: '#3A8276'}}
                thumbColor={switchIsEnabled ? '#216869' : '#1F2421'}
                ios_backgroundColor="#A8DEB9"
                onValueChange={toggleSwitch}
                value={switchIsEnabled}
              />
            </View>
          </View>
          <View style={tw`ml-5 mt-3`}>
            <Text style={tw`font-montBold text-5 text-bblack mb-1`}>
              Waktu Sholat To'do
            </Text>
          </View>
          <View style={tw`flex-row justify-center`}>
            <LinearGradient
              start={{x: 1.5, y: 0}}
              end={{x: 0.8, y: 2.3}}
              locations={[0, 0.5, 1]}
              colors={['#80B9A2', '#C5F4CB', '#80B9A2']}
              style={[
                tw`h-50 w-89 rounded-4 border border-line`,
                {opacity: 1},
              ]}>
              <View style={tw`absolute flex-col justify-center my-6 ml-4`}>
                <View style={tw`flex-row gap-2`}>
                  <Pressable onPress={() => handleTodo('shubuh')} style={tw``}>
                    <LinearGradient
                      start={{x: 0.5, y: 0.0}}
                      end={{x: 0.5, y: 1.0}}
                      colors={
                        todoIsEnabled.shubuh
                          ? ['#216869', '#1F2421']
                          : ['#49A078', '#216869']
                      }
                      style={tw`px-2.5 py-2 rounded-3`}>
                      <Text style={tw`font-montBold text-3 text-bgreen`}>
                        Shubuh
                      </Text>
                    </LinearGradient>
                  </Pressable>
                  <Pressable onPress={() => handleTodo('dzuhur')} style={tw``}>
                    <LinearGradient
                      start={{x: 0.5, y: 0.0}}
                      end={{x: 0.5, y: 1.0}}
                      colors={
                        todoIsEnabled.dzuhur
                          ? ['#216869', '#1F2421']
                          : ['#49A078', '#216869']
                      }
                      style={tw`px-2.5 py-2 rounded-3`}>
                      <Text style={tw`font-montBold text-3 text-bgreen`}>
                        Dzuhur
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
                <View style={tw`flex-row gap-2 mt-2.5`}>
                  <Pressable onPress={() => handleTodo('ashar')} style={tw``}>
                    <LinearGradient
                      start={{x: 0.5, y: 0.0}}
                      end={{x: 0.5, y: 1.0}}
                      colors={
                        todoIsEnabled.ashar
                          ? ['#216869', '#1F2421']
                          : ['#49A078', '#216869']
                      }
                      style={tw`px-2.5 py-2 rounded-3`}>
                      <Text style={tw`font-montBold text-3 text-bgreen`}>
                        Ashar
                      </Text>
                    </LinearGradient>
                  </Pressable>
                  <Pressable onPress={() => handleTodo('maghrib')} style={tw``}>
                    <LinearGradient
                      start={{x: 0.5, y: 0.0}}
                      end={{x: 0.5, y: 1.0}}
                      colors={
                        todoIsEnabled.maghrib
                          ? ['#216869', '#1F2421']
                          : ['#49A078', '#216869']
                      }
                      style={tw`px-2.5 py-2 rounded-3`}>
                      <Text style={tw`font-montBold text-3 text-bgreen`}>
                        Maghrib
                      </Text>
                    </LinearGradient>
                  </Pressable>
                  <Pressable onPress={() => handleTodo('isya')} style={tw``}>
                    <LinearGradient
                      start={{x: 0.5, y: 0.0}}
                      end={{x: 0.5, y: 1.0}}
                      colors={
                        todoIsEnabled.isya
                          ? ['#216869', '#1F2421']
                          : ['#49A078', '#216869']
                      }
                      style={tw`px-2.5 py-2 rounded-3`}>
                      <Text style={tw`font-montBold text-3 text-bgreen`}>
                        Isya
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
                <View style={tw`flex-col mt-6`}>
                  {nextPrayer && nextPrayer.waktu ? (
                    <>
                      <Text style={tw`font-montBold text-5 text-ggreen`}>
                        {nextPrayer.waktu}
                      </Text>
                      <Text style={tw`font-montMed text-3.3 text-bblack`}>
                        menuju sholat {nextPrayer.nama.toLowerCase()}...
                      </Text>
                    </>
                  ) : (
                    <Text style={tw`font-montMed text-3.3 text-bblack`}>
                      Menunggu data waktu sholat...
                    </Text>
                  )}
                </View>
              </View>
              <Clock />
            </LinearGradient>
          </View>
          {/* <View style={tw`flex-row justify-center items-center`}>
            <Text style={tw`text-5 font-montBold text-bblack`}>Home Page</Text>
            <TouchableOpacity
              onPress={handleLogout}
              style={tw`m-5 p-2 bg-red-600 rounded-lg`}>
              <Text style={tw`text-5 font-montBold text-white`}>Logout</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
