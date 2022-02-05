"use strict";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View, Image, FlatList, Pressable, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";

const styles = StyleSheet.create({
	icon_container: {
		alignItems: "center",
		justifyContent: "center"
	},

	fill_container: {
		width: "100%",
		height: "100%"
	},

	name_container: {
		borderBottomColor: "white",
		borderBottomWidth: 5,
		marginLeft: 10,
		marginRight: 10,
		paddingBottom: 10,
		paddingTop: 10
	},

	name_text: {
		textAlign: "center",
		color: "white",
		fontSize: 48,
		fontFamily: "FNFont"
	},

	normal_text: {
		textAlign: "left",
		color: "white",
		fontSize: 28,
		fontFamily: "FNFont"
	}
});

export default function Screen({route, navigation}) {
	const fortnite = global.Fortnite;
	const item_data = Fortnite.known_items[route.params.item_id];
	const item_name = item_data.displayName.trim().toUpperCase();

	useEffect(() => {
		navigation.setOptions({title: item_data.displayType});
	}, []);

	const theme = Theme.systemTheme();
	const { height, width } = useWindowDimensions();

	const margin_size = 10;
	const image_size = (width/2) - (margin_size * 2);

	const renderItem = ({item}) => {
		return (
			<View style={[styles.icon_container, {width: image_size, height: image_size, margin: margin_size}]}>
				<Pressable style={styles.fill_container} onPress={() => navigation.navigate("image", {
						display_name: item_name,
						url: item.url
					})}>
					<View style={[styles.iconImage, styles.fill_container]}>
						<Image source={{uri: item.url}} style={[
							styles.fill_container,
							{backgroundColor: theme.header_stylesheet.backgroundColor}
						]}/>
					</View>
				</Pressable>
			</View>
		);
	};

	const text_stylesheet = Object.assign(StyleSheet.create({}), styles.normal_text, {color: theme.stylesheet.color});
	const separator_color = theme.header_stylesheet.backgroundColor; //Fortnite.getRarityColour(item_data.rarity.name)

	const daysAgo = (date_string) => {
		const then = new Date(date_string);
		const now = new Date();
		return Math.floor((now - then) / 86400000);
	};

	return (
		<SafeAreaView style={theme.stylesheet}>
			<StatusBar style={theme.statusbar_theme}/>
			<View style={[styles.name_container, {borderBottomColor: separator_color}]}>
				<Text numberOfLines={1} adjustsFontSizeToFit={true} style={[styles.name_text, {color: theme.stylesheet.color}]}>{item_data.displayName.toUpperCase()}</Text>
				{item_data.displayDescription ? <Text style={[text_stylesheet, {textAlign: "center"}]}>{item_data.displayDescription}</Text> : null}
			</View>
			<View style={[styles.name_container, {borderBottomColor: separator_color}]}>
				<Text style={text_stylesheet}>Rarity: {item_data.rarity.name}</Text>
				<Text style={text_stylesheet}>Price: {item_data.price.finalPrice}v</Text>
				{item_data.series ? <Text style={text_stylesheet}>Series: {item_data.series.name}</Text> : null}
				<Text style={text_stylesheet}>First Seen: {item_data.firstReleaseDate} ({daysAgo(item_data.firstReleaseDate)} days ago)</Text>
				{item_data.previousReleaseDate ? <Text style={text_stylesheet}>Last Seen: {item_data.previousReleaseDate} ({daysAgo(item_data.previousReleaseDate)} days ago)</Text> : null}
			</View>
			<FlatList
				style={theme.stylesheet}
				initialNumToRender={1}
				numColumns={2}
				data={item_data.displayAssets}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
			/>
		</SafeAreaView>
	);
}
