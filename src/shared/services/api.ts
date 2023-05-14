import axios from "axios";

const token = localStorage.getItem("@EMTechs:token");
const serverUrl = "https://system-api.vercel.app/";
const localServer = "http://localhost:4002/";

const localApi = axios.create({
  baseURL: localServer,
  timeout: 5000,
});

const apiServerSide = axios.create({
  baseURL: serverUrl,
  timeout: 10000,
});

if (token) {
  localApi.defaults.headers.authorization = `Bearer ${token}`;
  apiServerSide.defaults.headers.authorization = `Bearer ${token}`;
}

export const apiUsingNow = apiServerSide;
