"use strict";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View, Image, FlatList, Pressable, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";

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

function getIsoDate(date) {
	return date.toISOString().split("T")[0];
}

export default function Screen({route, navigation}) {
	const Fortnite = global.Fortnite;
	const Theme = global.Theme;

	const theme = Theme.systemTheme();
	const { height, width } = useWindowDimensions();

	const [shop, setShop] = useState();

	useEffect(() => {
		(async () => {
			const response = await Fortnite.itemShop();
			global.last_item_shop_response = response;
			const title = `${getIsoDate(new Date(response.lastUpdate.date))} (${response.shop.length} items)`;
			navigation.setOptions({title: title});
			setShop(response);
		})();
	}, []);

	const margin_size = 10;
	const image_size = (width / 2) - (margin_size * 2);

	const renderItem = ({item}) => {
		const bg_colour = item.series ? Fortnite.getSeriesColour(item.series.name) : Fortnite.getRarityColour(item.rarity.name);
		return (
			<View style={[styles.iconContainer, {width: image_size, height: image_size, margin: margin_size}]}>
				<Pressable style={styles.fillContainer} onPress={() => navigation.navigate("item", {item_id: item.mainId})}>
					<View style={styles.fillContainer}>
						<View style={[styles.iconImage, styles.fillContainer]}>
							<Image source={{uri:item.displayAssets[0].background}} style={[
								styles.fillContainer,
								{backgroundColor: bg_colour}
							]}/>
						</View>
						<Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.iconText}>{item.displayName.toUpperCase()}</Text>
					</View>
				</Pressable>
			</View>
		);
	};

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
				<Text style={Theme.getStylesheet(theme)}>Getting Item Shop Data...</Text>
			</View>
		)
	);
}
