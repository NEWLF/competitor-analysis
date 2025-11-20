import { legacyRequester } from "../requester";

export async function login({id, password}) {
  const res = await legacyRequester.post("/auth", { username: id, password });
  return res.data;
}
