import axios from "axios";

const auth = {
  username: "itsolution",
  password: "!54321",
};

export const legacyRequester = axios.create({
  baseURL: "http://10.49.8.10:9200",
  // baseURL: `http://${
  //   typeof window !== "undefined" && window.location.hostname
  // }:9200`, // dev 모드일때 사용
  auth,
});
