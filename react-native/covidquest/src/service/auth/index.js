import * as api from "../api";
import user from "./../../data/user";
// import SERVER from "../../config/server";

export async function token() {
  return await user.getToken();
}

// export async function getUser() {
//   var url = "https://randomuser.me/api/";
//   return  await api.get(url,{});
// }

// export async function loggedIn() {
// 	return  await user.isLogedIn();
// }

// export async function logout() {
// 	//Invoke API Call here to remove token from server etc ..
// 	await user.setLogin(false);;
//     return false;
// }
// export async function login(payload) {
//   var url = "https://reqres.in/api/users";
//   return  await api.post(url,payload);
// }
