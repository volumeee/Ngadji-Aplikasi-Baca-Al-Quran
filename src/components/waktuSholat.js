export const waktuSholat = [
  {nama: 'Shubuh', waktu: '04:30'},
  {nama: 'Dzuhur', waktu: '12:00'},
  {nama: 'Ashar', waktu: '15:30'},
  {nama: 'Maghrib', waktu: '18:00'},
  {nama: 'Isya', waktu: '19:30'},
];

const checkWaktuSholat = (currentTime, waktuSholat) => {
  const {hours, minutes} = currentTime;

  for (let i = 0; i < waktuSholat.length; i++) {
    const waktu = waktuSholat[i];
    const sholatTime = new Date();
    const [sholatHours, sholatMinutes] = waktu.waktu.split(':');
    sholatTime.setHours(parseInt(sholatHours));
    sholatTime.setMinutes(parseInt(sholatMinutes));

    if (
      hours < sholatTime.getHours() ||
      (hours === sholatTime.getHours() && minutes < sholatTime.getMinutes())
    ) {
      return waktu; // Waktu sholat belum lewat, kembalikan waktu sholat ini
    }
  }

  // Jika sampai di sini, artinya semua waktu sholat sudah lewat, maka kembali ke waktu Shubuh
  return waktuSholat[0];
};

export {checkWaktuSholat};
