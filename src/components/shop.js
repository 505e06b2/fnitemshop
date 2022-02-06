"use strict";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View, Image, FlatList, Button, Pressable, ActivityIndicator, RefreshControl, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

/* TODO
- Link to a credits page: use code FNAPI
*/

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
	},

	header_icon: {
		alignItems: "flex-end",
		justifyContent: "flex-end",
		width: 48
	},

	popup_menu: {
		position: "absolute",
		right: 0,
		top: 0,
		width: 150
	},

	popup_menu_item: {
		padding: 10,
		fontSize: 16,
		color: "black"
	}
});

function getIsoDate(date) {
	return date.toISOString().split("T")[0];
}

export default function Screen({route, navigation}) {
	const theme = Theme.systemTheme();
	const { height, width } = useWindowDimensions();

	const [shop, setShop] = useState();
	const [menu_visibility, setMenuVisibility] = useState(false);

	const refreshItemShop = async () => {
		const icon_ellipsis = (
			<Pressable style={styles.header_icon} onPress={() => setMenuVisibility(menu_visibility ? false : true)}>
				<Ionicons name="md-ellipsis-vertical" size={32} color={theme.header_stylesheet.color}/>
			</Pressable>
		);

		const icon_refresh = (
			<Pressable style={styles.header_icon} onPress={refreshItemShop}>
				<Ionicons name="md-refresh" size={32} color={theme.header_stylesheet.color}/>
			</Pressable>
		);

		setShop(undefined);
		navigation.setOptions({
			title: "",
			headerRight: () => (
				<View style={{flexDirection:"row"}}>
					{icon_ellipsis}
				</View>
			),
		});

		const response = await Fortnite.itemShop();
		global.last_item_shop_response = response;
		const title = `${getIsoDate(new Date(response.lastUpdate.date))} (${response.shop.length} items)`;
		navigation.setOptions({
			title: title,
			headerRight: () => (
				<View style={{flexDirection:"row"}}>
					{icon_refresh}
					{icon_ellipsis}
				</View>
			),
		});
		setShop(response);
	};

	useEffect(() => refreshItemShop(), []);

	const margin_size = 10;
	const image_size = (width / 2) - (margin_size * 2);

	const render_item = ({item}) => (
		<View style={[styles.icon_container, {width: image_size, height: image_size, margin: margin_size}]}>
			<Pressable style={styles.fill_container} onPress={() => navigation.navigate("item", {item_id: item.mainId})}>
				<View style={styles.fill_container}>
					<View style={[
						styles.icon_image,
						styles.fill_container,
						{backgroundColor: Fortnite.getRarityColour(item.rarity.name), paddingBottom: 5}
					]}>
						<Image source={{uri: item.displayAssets[0].background}} style={[styles.fill_container]}/>
					</View>
					<Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.icon_text}>{item.displayName.toUpperCase()}</Text>
				</View>
			</Pressable>
		</View>
	);

	return (
		<SafeAreaView style={[styles.container, theme.stylesheet]}>
			<StatusBar style={theme.statusbar_theme}/>
			{shop ? (
				<FlatList
					onTouchStart={() => setMenuVisibility(false)}
					style={theme.stylesheet}
					initialNumToRender={8}
					numColumns={2}
					maxToRenderPerBatch={8}
					data={shop.shop}
					renderItem={render_item}
					refreshControl={<RefreshControl onRefresh={refreshItemShop}/>}
					keyExtractor={(item, index) => index.toString()}
				/>
			) : (
				<ActivityIndicator size="large" color={theme.stylesheet.color}/>
			)}
			{menu_visibility ? (
				<FlatList
					style={[styles.popup_menu, theme.header_stylesheet]}
					numColumns={1}
					data={[
						{text: "Settings", onPress: () => alert("Not Implemented", "Pester 505e06b2 to get it made!")},
						{text: "About", onPress: () => navigation.navigate("about")}
					]}
					renderItem={({item}) => (
						<View style={{borderTopWidth: 1, borderTopColor: theme.header_stylesheet.color}}>
							<Pressable onPress={() => {setMenuVisibility(false); item.onPress()}}>
								<Text style={[styles.popup_menu_item, theme.header_stylesheet]}>{item.text}</Text>
							</Pressable>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
			) : null}
		</SafeAreaView>
	);
}
