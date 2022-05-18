import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import RootNavigation from "./navigations/index";
import { persistor, store } from "./app/Store";
import { Alert, SafeAreaView } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./theme/AppTheme";
import "react-native-gesture-handler";
import { useNetInfo } from "@react-native-community/netinfo";

export default function App() {
	const netInfo = useNetInfo();
	useEffect(() => {
		console.log(netInfo?.isConnected);
		netInfo?.isConnected === false &&
			Alert.alert("No Internet Connection!", "Please turn on your mobile network connection.", [{ text: "Close" }], {
				cancelable: false,
			});
	}, [netInfo.isConnected]);

	return (
		<>
			{/* Mobile StatusBar config */}
			<StatusBar style="auto" />
			{/* Redux data provider from "Store" data */}
			<Provider store={store}>
				{/* redux persist wrapper for using stored data in asyncStorage */}
				<PersistGate loading={null} persistor={persistor}>
					{/* Theme provider for react-native-paper components */}
					<PaperProvider theme={theme}>
						{/* Wrapper to avoid notches and bottom menus across devices */}
						<SafeAreaView style={{ flex: 1 }}>
							<RootNavigation />
						</SafeAreaView>
					</PaperProvider>
				</PersistGate>
			</Provider>
		</>
	);
}
