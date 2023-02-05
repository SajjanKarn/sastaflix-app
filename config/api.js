import * as Network from 'expo-network';

export let STREAMING_API_URL = '';

const getIpAddress = async () => {
  try {
    const ip = await Network.getIpAddressAsync();
    STREAMING_API_URL = `http://${ip}:3000/stream`;
    console.log(STREAMING_API_URL);
  } catch (error) {
    console.log(error);
  }
};

getIpAddress();
