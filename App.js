import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import RootNavigation from "./navigations/index";
import { persistor, store } from "./app/Store";
import { SafeAreaView } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./theme/AppTheme";

export default function App() {
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
