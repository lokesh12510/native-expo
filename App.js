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
      <StatusBar style="auto" />
      {/* Redux data provider from "Store" data */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <SafeAreaView style={{ flex: 1 }}>
              <RootNavigation />
            </SafeAreaView>
          </PaperProvider>
          {/* Mobile StatusBar config */}
        </PersistGate>
      </Provider>
    </>
  );
}
