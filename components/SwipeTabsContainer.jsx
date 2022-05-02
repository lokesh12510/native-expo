import {
  Animated,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";

import theme from "../theme/AppTheme";

import { TabView, SceneMap } from "react-native-tab-view";
import { FoodItem } from "./SwipeTabsItem";

const { colors, SIZES } = theme;

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
const SwipeTabsContainer = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "Third" },
    { key: "fourth", title: "Fourth" },
  ]);

  return (
    <>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim animi
        rerum, quas deserunt eveniet provident possimus similique ab obcaecati
        aperiam velit voluptas veniam repellendus nesciunt at totam dolores
        dolorem maiores voluptatibus porro. Pariatur aliquam officia nostrum
        incidunt hic impedit odio numquam dolorum dolor quibusdam, est
        aspernatur, omnis eaque cumque tempora quod odit accusantium temporibus,
        ut quas. Rerum voluptate beatae, temporibus error nemo quas non commodi
        laborum excepturi aspernatur! Alias, doloribus impedit porro accusamus
        quas ut. Laudantium porro corporis sed veritatis nihil magni et possimus
        maiores molestias similique laboriosam hic quas minima, autem nam
        cupiditate ut libero repellat labore non placeat maxime? Non cupiditate
        doloribus praesentium doloremque aliquam, impedit quaerat consequuntur
        rem veritatis numquam quibusdam eos, dignissimos in, alias ea beatae.
        Eaque, veniam illo nemo adipisci eius rem? Tempore optio officia
        nesciunt in inventore voluptatem labore, voluptatum laboriosam
        repellendus amet accusamus vero fuga non incidunt expedita rem illo,
        quasi atque. Eligendi repellat labore, accusamus consectetur inventore
        ullam molestiae accusantium quasi illum adipisci pariatur delectus odit
        nisi impedit veniam error repellendus quod expedita cum! Deleniti
        voluptatibus sit inventore reprehenderit perspiciatis commodi reiciendis
        tempora fugit consequatur esse enim magnam, eligendi vel repellat alias.
        Voluptas omnis vel natus repellat nam reiciendis nulla cumque eos.
      </Text>
    </>
  );
};

export default SwipeTabsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
  },
  selectedKitchenContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kitchenImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    elevation: 8,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  tabContainer: {
    paddingHorizontal: 16,
    flex: 1,
    // flexDirection: "column",
    // height: 400,
    height: SIZES.height - 45,
  },
  kitchenContent: {
    paddingHorizontal: 10,
    flex: 2,
  },
  kitchenTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
    color: colors.black,
  },
  subTitle: {
    fontSize: 14,
    color: colors.black,
  },
  IconBtn: {
    margin: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
