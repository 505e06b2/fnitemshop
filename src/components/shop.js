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
	const fortnite = route.params.fortnite;

	const theme = Theme.systemTheme();
	const { height, width } = useWindowDimensions();

	const [shop, setShop] = useState();

	useEffect(() => {
		(async () => {
			const response = await fortnite.itemShop();
			const title = `${getIsoDate(new Date(response.lastUpdate.date))} (${response.shop.length} items)`;
			navigation.setOptions({title: title});
			setShop(response);
		})();
	}, []);

	const margin_size = 10;
	const image_size = (width / 2) - (margin_size * 2);

	const renderItem = ({item}) => (
		<View style={[styles.iconContainer, {width: image_size, height: image_size, margin: margin_size}]}>
			<View style={styles.fillContainer}>
				<View style={[styles.iconImage, styles.fillContainer]}>
					<Image source={{uri:item.displayAssets[0].background}} style={[
						styles.fillContainer,
						{
							backgroundColor: item.series ?
								series_colours[item.series.name
									.toLowerCase()
									.replace("series", "")
									.replace(/ /g, "")
									.trim()
								] : rarity_colours[item.rarity.name.toLowerCase()]
						}
					]}/>
				</View>
				<Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.iconText}>{item.displayName.toUpperCase()}</Text>
			</View>
		</View>
	);

	return (
		shop ? (
			<SafeAreaView style={Theme.getStylesheet(theme)}>
				<StatusBar style={Theme.getStatusBarTheme(theme)}/>
				<FlatList
					style={Theme.getStylesheet(theme)}
					initialNumToRender={8}
					numColumns={2}
					maxToRenderPerBatch={8}
					data={shop.shop}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
				/>
			</SafeAreaView>
		) : (
			<View style={[styles.container, Theme.getStylesheet(theme)]}>
				<StatusBar style={Theme.getStatusBarTheme(theme)}/>
				<Text style={Theme.getStylesheet(theme)}>Loading...</Text>
			</View>
		)
	);
}
