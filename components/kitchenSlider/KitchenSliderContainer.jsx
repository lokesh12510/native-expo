import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import React from "react";
import theme from "../../theme/AppTheme";
import KitchenSliderItem from "./KitchenSliderItem";

const { colors, SIZES } = theme;

const KitchenSliderContainer = () => {
  return (
    <View style={styles.kitchenContainer}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Popular Kitchens</Text>

        <FlatList
          style={styles.sliderItemContainer}
          data={DATA}
          pagingEnabled={true}
          legacyImplementation={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => <KitchenSliderItem item={item} />}
          keyExtractor={(item) => item.id}
          disableIntervalMomentum
        />
      </View>
    </View>
  );
};

export default KitchenSliderContainer;

const styles = StyleSheet.create({
  kitchenContainer: {
    paddingVertical: 1,
    paddingLeft: 16,
  },
  sectionTitleContainer: {
    paddingVertical: 7,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  sliderItemContainer: {
    width: SIZES.width,
  },
});

const DATA = [
  {
    id: 10,
    kitchen_name: "The New View",
    image:
      "https://homecook.csuat.xyz:8000/uploads/cook/File_f48e6020-0916-4ab5-9208-fbe127e52699.png",
    city: "Coimbatore",
    rating: "3.5",
    distance: 4.10435,
    foods: [
      {
        type: "BreakFast",
      },
      {
        type: "Lunch",
      },
      {
        type: "Snacks",
      },
      {
        type: "Dinner",
      },
    ],
  },
  {
    id: 14,
    kitchen_name: "Comfort B&B",
    image:
      "https://homecook.csuat.xyz:8000/uploads/cook/File_fdb2e559-a271-4dc2-8ae8-c4f9de64c05e.jpg",
    city: "Coimbatore",
    rating: "3.3",
    distance: 3.65666,
    foods: [
      {
        type: "BreakFast",
      },
      {
        type: "Lunch",
      },
      {
        type: "Snacks",
      },
      {
        type: "Dinner",
      },
    ],
  },
  {
    id: 13,
    kitchen_name: "Decon",
    image:
      "https://homecook.csuat.xyz:8000/uploads/cook/File_9133d95c-f044-4737-b076-0577c490e7a4.jpg",
    city: "Coimbatore",
    rating: "3.0",
    distance: 3.65666,
    foods: [
      {
        type: "BreakFast",
      },
      {
        type: "Lunch",
      },
      {
        type: "Snacks",
      },
      {
        type: "Dinner",
      },
    ],
  },
  {
    id: 11,
    kitchen_name: "Lake Place Inn",
    image:
      "https://homecook.csuat.xyz:8000/uploads/cook/File_c37a77ed-f76c-46e0-ba65-fa0de201e8d6.png",
    city: "Coimbatore",
    rating: "2.8",
    distance: 4.56437,
    foods: [
      {
        type: "BreakFast",
      },
      {
        type: "Lunch",
      },
      {
        type: "Snacks",
      },
      {
        type: "Dinner",
      },
    ],
  },
  {
    id: 16,
    kitchen_name: "Ramada",
    image:
      "https://homecook.csuat.xyz:8000/uploads/cook/File_e7913c2d-d9d6-4373-bd15-e7aab92b72a7.png",
    city: "coimbatore",
    rating: "0.0",
    distance: 0.234419,
    foods: [
      {
        type: "BreakFast",
      },
      {
        type: "Lunch",
      },
      {
        type: "Snacks",
      },
      {
        type: "Dinner",
      },
    ],
  },
  {
    id: 21,
    kitchen_name: "cook home",
    image: "https://homecook.csuat.xyz:8000/noimage/cook.jpg",
    city: "Coimbatore",
    rating: "0.0",
    distance: 1.44989,
    foods: [],
  },
];
