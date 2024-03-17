import AsyncStorage from '@react-native-async-storage/async-storage';

// mengambil data dari async storage
export const fetchTodoIsEnabled = async () => {
  try {
    const todoIsEnabledString = await AsyncStorage.getItem('todoIsEnabled');
    if (todoIsEnabledString) {
      const todoIsEnabledData = JSON.parse(todoIsEnabledString);
      console.log('Data todoIsEnabled berhasil dimuat:', todoIsEnabledData);
      return todoIsEnabledData;
    }
  } catch (err) {
    console.log('error fetching todo data from storage: ' + err.message);
  }
};

// menyimpan data ke async storage
export const saveTodoIsEnabled = async todoIsEnabled => {
  try {
    await AsyncStorage.setItem('todoIsEnabled', JSON.stringify(todoIsEnabled));
    console.log('Data todoIsEnabled berhasil disimpan:', todoIsEnabled);
  } catch (err) {
    console.log('error saving todo to async storage', err.message);
  }
};
