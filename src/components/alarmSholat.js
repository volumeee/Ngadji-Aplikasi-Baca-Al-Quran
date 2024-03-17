import Sound from 'react-native-sound';

const adzan = new Sound('adzanmekkah.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  console.log('adzan loaded successfully');
});

const playAdzan = () => {
  adzan.play(success => {
    if (success) {
      console.log('adzan played successfully');
    } else {
      console.log('adzan playback failed');
    }
  });
};

export default playAdzan;
