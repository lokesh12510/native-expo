import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import React from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import { FoodItem } from "../../../components/SwipeTabsItem";
import { useLayoutEffect } from "react";

const Orders = ({ navigation }) => {
  const FirstRoute = () => (
    <ScrollView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      {[...Array(6)].map((item, index) => {
        return <FoodItem key={index} />;
      })}
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      {[...Array(6)].map((item, index) => {
        return <FoodItem key={index} />;
      })}
    </ScrollView>
  );
  const ThirdRoute = () => (
    <ScrollView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      {[...Array(6)].map((item, index) => {
        return <FoodItem key={index} />;
      })}
    </ScrollView>
  );
  const FourthRoute = () => (
    <ScrollView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      {[...Array(6)].map((item, index) => {
        return <FoodItem key={index} />;
      })}
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
    five: FirstRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "Third" },
    { key: "fourth", title: "Fourth" },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Orders",
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TabView
        tabStyle={{ width: "auto" }}
        swipeEnabled
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </ScrollView>
  );
};

export default Orders;
