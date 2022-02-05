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

	icon_container: {
		alignItems: "center",
		justifyContent: "center"
	},

	fill_container: {
		width: "100%",
		height: "100%"
	},

	icon_text: {
		marginTop: "auto",
		textAlign: "center",
		color: "white",
		fontSize: 24,
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		fontFamily: "FNFont",
		marginBottom: 5
	},

	icon_image: {
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
		const bg_colour = Fortnite.getRarityColour(item.rarity.name);
		return (
			<View style={[styles.icon_container, {width: image_size, height: image_size, margin: margin_size}]}>
				<Pressable style={styles.fill_container} onPress={() => navigation.navigate("item", {item_id: item.mainId})}>
					<View style={styles.fill_container}>
						<View style={[
							styles.icon_image,
							styles.fill_container,
							{backgroundColor: bg_colour, paddingBottom:5}
						]}>
							<Image source={{uri: item.displayAssets[0].background}} style={[styles.fill_container]}/>
						</View>
						<Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.icon_text}>{item.displayName.toUpperCase()}</Text>
					</View>
				</Pressable>
			</View>
		);
	};

	return (
		shop ? (
			<SafeAreaView style={theme.stylesheet}>
				<StatusBar style={theme.statusbar_theme}/>
				<FlatList
					style={theme.stylesheet}
					initialNumToRender={8}
					numColumns={2}
					maxToRenderPerBatch={8}
					data={shop.shop}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
				/>
			</SafeAreaView>
		) : (
			<View style={[styles.container, theme.stylesheet]}>
				<StatusBar style={theme.statusbar_theme}/>
				<Text style={theme.stylesheet}>Getting Item Shop Data...</Text>
			</View>
		)
	);
}
