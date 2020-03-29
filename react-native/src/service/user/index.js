import * as api from "../api";
import SERVER from "../../config/server";

//get profile
export async function getData(payload) {
  // console.log("service called",payload)
  let URL = `${SERVER.USER.GET}/${payload.device_id}/${payload.platform}/${
    payload.latitude
    }/${payload.longitude}`;
  console.log("service called", URL);
  let res = await api.get(URL);
  // if(res.message){
  //     alert(res.message)
  //     return null
  // }
  return res;
}

//get profile
export async function getSpies(payload) {
  // console.log("service called",payload)
  let URL = `${SERVER.USER.GET}/${payload.device_id}/${payload.platform}/${
    payload.latitude
    }/${payload.longitude}`;
  console.log("service called", URL);
  let res = await api.get(URL);
  // if(res.message){
  //     alert(res.message)
  //     return null
  // }
  return res;
}

//get profile
export async function getEvents(payload) {
  // console.log("service called",payload)
  let URL = `${SERVER.USER.GET}/${payload.device_id}/${payload.platform}/${
    payload.latitude
    }/${payload.longitude}`;
  console.log("service called", URL);
  let res = await api.get(URL);
  // if(res.message){
  //     alert(res.message)
  //     return null
  // }
  return res;
}
