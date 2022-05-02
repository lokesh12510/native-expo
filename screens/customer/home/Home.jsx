import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useRef } from "react";
import theme from "../../../theme/AppTheme";

import SearchField from "../../../components/SearchField";
import LocationSelect from "../../../components/LocationSelect";
import HSliderContainer from "../../../components/HSliderContainer";
import KitchenSliderItem from "../../../components/KitchenSliderItem";
import SpecialOffersSliderItem from "../../../components/SpecialOffersSliderItem";
import MainCategory from "../../../components/MainCategory";
import SwipeTabsContainer from "../../../components/SwipeTabsContainer";
import FloatingCart from "../../../components/FloatingCart";
import { useSelector } from "react-redux";

import { useScrollToTop } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { FoodItem } from "../../../components/SwipeTabsItem";

const { colors } = theme;

const Home = () => {
  const { itemCount } = useSelector((state) => state.cart);

  return (
    <>
      <ScrollView
        style={styles.root}
        stickyHeaderIndices={[4, 5]}
        stickyHeaderHiddenOnScroll={true}
      >
        {/* Hero Text Container*/}
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroText1}>Hi, Slyvie</Text>
          <Text style={styles.heroText2}>
            Order Food Online from the best Homecook{" "}
          </Text>
        </View>
        {/* Hero Text Container*/}
        {/* Search Bar Container */}
        <SearchField />
        {/* Search Bar Container */}
        {/* Main Category Container */}
        <MainCategory />
        {/* Main Category Container */}
        {/* Kitchen Slider  */}
        <HSliderContainer sectionTitle={"Popular Kitchen"}>
          <FlatList
            data={DATA}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item, index }) => (
              <KitchenSliderItem item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
            disableIntervalMomentum
            decelerationRate={0}
            snapToInterval={340} //your element width
            snapToAlignment={"center"}
          />
        </HSliderContainer>
        {/* Kitchen Slider  */}
        {/* Special Offers Container */}
        {/* <HSliderContainer sectionTitle={"Special Offers"}>
        <FlatList
          style={{ marginBottom: 10 }}
          data={OFFER_DATA}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => (
            <SpecialOffersSliderItem item={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          disableIntervalMomentum
          decelerationRate={0}
          snapToInterval={210} //your element width
          snapToAlignment={"center"}
        />
      </HSliderContainer> */}
        {/* Special Offers Container */}

        {/* {[...Array(4)].map((item, index) => {
          return <FoodItem key={index} />;
        })} */}

        <View style={{ padding: 50 }}></View>
        {/* Swipe Tabs Container */}
        <SwipeTabsContainer />
        {/* Swipe Tabs Container */}
      </ScrollView>
      {/* Floating Cart View */}
      {itemCount > 0 && <FloatingCart />}

      {/* Floating Cart View */}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    width: theme.SIZES.width,
    height: "100%",
    backgroundColor: "#fff",
    position: "relative",
  },
  container: {
    paddingHorizontal: 16,
  },
  heroTextContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  heroText1: {
    fontSize: 25,
    color: colors.secondary,
    fontWeight: "bold",
  },
  heroText2: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: "bold",
  },
});

const DATA = [
  {
    id: 10,
    kitchen_name: "The New View",
    image:
      "https://media.easemytrip.com/media/Blog/India/636977607425696252/636977607425696252QYiiUU.jpg",
    city: "Coimbatore",
    rating: "3.5",
    distance: 4.10435,
  },
  {
    id: 14,
    kitchen_name: "Comfort B&B",
    image:
      "https://www.holidify.com/images/cmsuploads/compressed/Indian-Food-wikicont_20180907171823.jpg",
    city: "Coimbatore",
    rating: "3.3",
    distance: 3.65666,
  },
  {
    id: 13,
    kitchen_name: "Decon",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80",
    city: "Coimbatore",
    rating: "3.0",
    distance: 3.65666,
  },
  {
    id: 11,
    kitchen_name: "Lake Place Inn",
    image:
      "https://img.traveltriangle.com/blog/wp-content/uploads/2019/08/Indian-Restaurants-In-Japan.jpg",
    city: "Coimbatore",
    rating: "2.8",
    distance: 4.56437,
  },
  {
    id: 16,
    kitchen_name: "Ramada",
    image:
      "https://homecook.csuat.xyz:8000/uploads/cook/File_e7913c2d-d9d6-4373-bd15-e7aab92b72a7.png",
    city: "coimbatore",
    rating: "0.0",
    distance: 0.234419,
  },
  {
    id: 21,
    kitchen_name: "cook home",
    image:
      "https://homecook.csuat.xyz:8000/uploads/cook/File_e7913c2d-d9d6-4373-bd15-e7aab92b72a7.png",
    city: "Coimbatore",
    rating: "0.0",
    distance: 1.44989,
    foods: [],
  },
];

const OFFER_DATA = [
  {
    id: 10,
    kitchen_name: "The New View",
    image:
      "https://img.traveltriangle.com/blog/wp-content/uploads/2019/08/Indian-Restaurants-In-Japan.jpg",
    city: "Coimbatore",
    rating: 3,
    discount: 22,
  },
  {
    id: 14,
    kitchen_name: "Comfort B&B",
    image:
      "https://www.holidify.com/images/cmsuploads/compressed/Indian-Food-wikicont_20180907171823.jpg",
    city: "Coimbatore",
    rating: 2,
    discount: 30,
  },
  {
    id: 13,
    kitchen_name: "Decon",
    image:
      "https://img.traveltriangle.com/blog/wp-content/uploads/2019/08/Indian-Restaurants-In-Japan.jpg",
    city: "Coimbatore",
    rating: 4,
    discount: 25,
  },
  {
    id: 11,
    kitchen_name: "Lake Place Inn",
    image:
      "https://homecook.csuat.xyz:8000/uploads/cook/File_c37a77ed-f76c-46e0-ba65-fa0de201e8d6.png",
    city: "Coimbatore",
    rating: 3,
    discount: 16,
  },
  {
    id: 16,
    kitchen_name: "Ramada",
    image:
      "https://homecook.csuat.xyz:8000/uploads/cook/File_e7913c2d-d9d6-4373-bd15-e7aab92b72a7.png",
    city: "coimbatore",
    rating: 2,
    discount: 19,
  },
  {
    id: 21,
    kitchen_name: "cook home",
    image: "https://homecook.csuat.xyz:8000/noimage/cook.jpg",
    city: "Coimbatore",
    rating: 4,
    discount: 11,
    foods: [],
  },
];
