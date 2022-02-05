"use strict";

export default function Fortnite(api_key, language="en") {
	this.itemShop = async () => await _apiCall("shop");

	const _apiCall = async (endpoint) => {
		const r = await fetch(`https://fortniteapi.io/v2/${endpoint}?lang=${language}`, {
			headers: {
				Authorization: api_key
			}
		});
		return await r.json();
	}
}
