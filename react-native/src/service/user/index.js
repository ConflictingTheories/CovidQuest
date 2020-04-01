import * as api from "../api";
import SERVER from "../../config/server";

//get profile
export async function getData(payload) {
  let URL = `${SERVER.USER.GET}/${payload.device_id}/${payload.platform}/${
    payload.latitude
    }/${payload.longitude}`;
  console.log("service called", URL);
  let res = await api.get(URL);
  return res;
}

//get profile
export async function getSpies(payload) {
  let URL = `${SERVER.USER.GET}/${payload.device_id}/${payload.platform}/${
    payload.latitude
    }/${payload.longitude}`;
  console.log("service called", URL);
  let res = await api.get(URL);
  return res;
}

//get profile
export async function getEvents(payload) {
  let URL = `${SERVER.USER.GET}/${payload.device_id}/${payload.platform}/${
    payload.latitude
    }/${payload.longitude}`;
  console.log("service called", URL);
  let res = await api.get(URL);
  return res;
}
