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
		handmade: "white",
		common: "grey",
		uncommon: "green",
		rare: "blue",
		epic: "purple",
		legendary: "orange",
		mythic: "gold",
		exotic: "cyan",
		transcendent: "lightred"
	};

	const _series_colours = {
		marvel: "darkred",
		dark: "magenta",
		dc: "midnightblue",
		icon: "cyan",
		frozen: "lightblue",
		lava: "darkorange",
		starwars: "yellow",
		shadow: "black",
		slurp: "darkcyan",
		gaminglegends: "indigo"
	};
}
