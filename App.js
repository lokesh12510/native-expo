import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import Navigation from "./routes/Navigation";
import { Store } from "./app/Store";
import { SafeAreaView } from "react-native";
import styled from "styled-components";

export default function App() {
  return (
    <>
      {/* Redux data provider from "Store" data */}
      <Provider store={Store}>
        <SafeAreaStyle>
          <Navigation />
        </SafeAreaStyle>

        {/* Mobile StatusBar config */}
        <StatusBar style="auto" />
      </Provider>
    </>
  );
}

const SafeAreaStyle = styled.SafeAreaView`
  flex: 1;
`;
