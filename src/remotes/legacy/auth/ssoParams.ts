import {legacyRequester} from "../requester";

export async function ssoParams() {
	const res = await legacyRequester.post("/auth/sso/params", { USER_ID: sessionStorage.getItem('userId') });
	return res.data;
}
