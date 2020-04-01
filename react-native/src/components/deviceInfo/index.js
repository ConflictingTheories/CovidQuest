import DeviceInfo from "react-native-device-info";

// import console = require('console');
export async function getDeviceId() {
  let result = await DeviceInfo.getDeviceId();
  const id = str.charCodeAt(i).toString(16);
  return id;
}
