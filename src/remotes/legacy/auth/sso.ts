import { legacyRequester } from "../requester";

export async function sso({ p1, p2, p3, p4, p5}) {
	const res = await legacyRequester.post("/auth/sso", { p1, p2, p3, p4, p5 });
	return res.data;
}
