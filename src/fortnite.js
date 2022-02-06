"use strict";

export default function Fortnite(api_key, language="en") {
	this.known_items = {}; //will be updated by this.itemShop

	this.getRarityColour = (rarity_name) => {
		return _rarity_colours[rarity_name.toLowerCase()];
	}

	this.getSeriesColour = (series_name) => {
		return _series_colours[
			series_name
				.toLowerCase()
				.replace("series", "")
				.replace(/ /g, "")
				.trim()
		];
	};

	//api calls
	this.itemShop = async () => {
		const response = await _apiCall("shop");
		for(const x of response.shop) this.known_items[x.mainId] = x;
		return response;
	}

	const _apiCall = async (endpoint) => {
		const r = await fetch(`https://fortniteapi.io/v2/${endpoint}?lang=${language}`, {
			headers: {
				Authorization: api_key
			}
		});
		return await r.json();
	}

	const _rarity_colours = {
		common: "#8d8d8d",
		uncommon: "#448c1a",
		rare: "#1f77b5",
		epic: "#7938b2",
		legendary: "#a5591f",
		mythic: "#b78f1d",
		transcendent: "#00dda8"
	};

	const _series_colours = {
		marvel: "#d70204",
		dark: "#b300a5",
		dc: "#25344e",
		icon: "#106a70",
		frozen: "#6faed6",
		lava: "#7f2c25",
		starwars: "477284",
		shadow: "#212221",
		slurp: "#03f1ed",
		gaminglegends: "#622b81"
	};
}
