import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import RootNavigation from "./navigations/index";
import { persistor, store } from "./app/Store";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <>
      {/* Redux data provider from "Store" data */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaStyle>
            <RootNavigation />
          </SafeAreaStyle>

          {/* Mobile StatusBar config */}
          <StatusBar style="auto" />
        </PersistGate>
      </Provider>
    </>
  );
}

const SafeAreaStyle = styled.SafeAreaView`
  flex: 1;
`;
