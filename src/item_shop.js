"use strict";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { StyleSheet, Text, SafeAreaView, View, Image, FlatList, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";

import FortniteAPI from "./fortnite_api";
import * as Theme from "./theme";

const api = new FortniteAPI("bffa4ca4-838726ea-1038cb50-5815af17");

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

export default function Screen() {
	const [fontsLoaded] = useFonts({
		"FNFont": require("../assets/fonts/BurbankBigCondensed-Black.otf"),
	});
	const theme = Theme.systemTheme();
	const { height, width } = useWindowDimensions();

	const [items, setItems] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await api.itemShop();
			setItems(response.shop);
		})();
	}, []);

	const margin_size = 10;
	const image_size = (width / 2) - (margin_size * 2);

	return (
		fontsLoaded && items ? (
			<SafeAreaView style={Theme.getStylesheet(theme)}>
				<StatusBar style={Theme.getStatusBarTheme(theme)}/>
				<FlatList
					style={Theme.getStylesheet(theme)}
					removeClippedSubviews={true}
					initialNumToRender={2}
					numColumns={2}
					maxToRenderPerBatch={2}
					data={items}
					renderItem={({item}) => (
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
								<Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.iconText}>{item.displayName}</Text>
							</View>
						</View>
					)}
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
