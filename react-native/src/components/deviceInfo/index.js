import DeviceInfo from "react-native-device-info";

function convertToHex(str) {
  var hex = "";
  for (var i = 0; i < str.length; i++) {
    hex += "" + str.charCodeAt(i).toString(16);
  }
  let n=null
  console.log("sample", hex.length);
  if(hex.length<=32)
  {
    n = 32 - hex.length;
    while (n > 0) {
      console.log("called", n);
      hex += "a";
      n--;
    }
  }
  else
  {
    n = hex.length-32
    hex=hex.slice(n)
  }
  
  // console.log("new value",hex)
  return hex;
}
// import console = require('console');
export async function getDeviceId() {
  let result = await DeviceInfo.getDeviceId();
  const id = convertToHex(result);
  console.log("called result🙂", result);
  return id;
  //  return(
  //     DeviceInfo.getMACAddress()
  //  )
}
