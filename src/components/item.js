"use strict";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View, Image, FlatList, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";

import * as Theme from "../theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},

	iconContainer: {
		alignItems: "center",
		justifyContent: "center"
	},

	fillContainer: {
		width: "100%",
		height: "100%"
	},

	iconText: {
		marginTop: "auto",
		textAlign: "center",
		color: "white",
		fontSize: 24,
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		fontFamily: "FNFont"
	},

	iconImage: {
		position: "absolute",
		left: 0,
		top: 0
	}
});

const rarity_colours = {
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

const series_colours = {
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

function getIsoDate(date) {
	return date.toISOString().split("T")[0];
}

export default function Screen({route, navigation}) {
	const fortnite = global.Fortnite;
	const item_data = Fortnite.known_items[route.params.item_id];
	const item_name = item_data.displayName.trim().toUpperCase();

	useEffect(() => {
		navigation.setOptions({title: item_name});
	}, []);

	const theme = Theme.systemTheme();

	return (
		<View style={[styles.container, Theme.getStylesheet(theme)]}>
			<StatusBar style={Theme.getStatusBarTheme(theme)}/>
			<Text style={Theme.getStylesheet(theme)}>{"me".trim().toUpperCase()}</Text>
		</View>
	);
}
