import { legacyRequester } from "../requester";

export async function log(payload) {
	if (process.env.NODE_ENV !== 'production') return
	const res = await legacyRequester.post("/log/dashboard", payload);
	return res.data;
}
