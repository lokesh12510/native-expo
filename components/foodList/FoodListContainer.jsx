import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../theme/AppTheme";
import { addItem, removeItem } from "../../app/slices/cartSlice";
import { closeKitchen } from "../../app/slices/FilterSlice";
import FoodCard from "./FoodCard";

const { colors, SIZES } = theme;

export const FoodItem = () => {
  const dispatch = useDispatch();

  const [itemCount, setItemCount] = useState(0);

  const addItemCount = () => {
    dispatch(addItem());
    setItemCount((count) => count + 1);
  };
  const removeItemCount = () => {
    dispatch(removeItem());
    setItemCount((count) => count > 0 && count - 1);
  };

  return (
    <View>
      <Pressable style={styles.swipeItem}>
        <View style={styles.foodContentContainer}>
          <View style={[styles.foodType, { borderColor: colors.primary }]}>
            <View
              style={[styles.dot, { backgroundColor: colors.primary }]}
            ></View>
          </View>
          <View style={styles.foodContent}>
            <Text style={styles.foodTitle}>Chicken Biriyani</Text>
          </View>
          <View style={styles.foodContent}>
            <Text style={styles.foodContentText}>&#x20B9; 500</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.extraContent}>
            <View style={styles.extraContentWrapper}>
              <MaterialCommunityIcons
                name="sale"
                size={15}
                color={colors.primary}
              />
              <Text style={styles.offerText}>Combo Offer Available</Text>
            </View>
          </View>
        </View>
        <View style={styles.foodImageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.foodImage}
              source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Indian-Food-wikicont_20180907171823.jpg",
              }}
            />
          </View>
          {itemCount > 0 ? (
            <View style={[styles.actionBtns, { borderRadius: 50 }]}>
              <>
                <Pressable onPress={removeItemCount}>
                  <Ionicons
                    name="ios-remove-circle-sharp"
                    size={27}
                    color={colors.white}
                  />
                </Pressable>
                <Text style={styles.itemCount}>{itemCount}</Text>
                <Pressable onPress={addItemCount}>
                  <Ionicons
                    name="ios-add-circle"
                    size={27}
                    color={colors.white}
                  />
                </Pressable>
              </>
            </View>
          ) : (
            <View style={[styles.actionBtns, { borderRadius: 10 }]}>
              <>
                <Pressable onPress={addItemCount}>
                  <Text style={[styles.itemCount, { fontSize: 18 }]}>Add</Text>
                </Pressable>
              </>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const FoodList = () => {
  const { isKitchen, kitchenInfo } = useSelector(
    (state) => state.filter.kitchen
  );
  const { isCategory, categoryInfo } = useSelector(
    (state) => state.filter.category
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeKitchen());
  };

  return (
    <>
      {/* selected Kitchen Container */}
      {isKitchen && (
        <View style={[styles.selectedKitchenContainer]}>
          <View style={styles.kitchenImageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: kitchenInfo.image,
              }}
            />
          </View>
          <View style={styles.kitchenContent}>
            <Text style={styles.kitchenTitle}>{kitchenInfo.kitchen_name}</Text>
            <Text style={styles.subTitle}>{kitchenInfo.city}</Text>
          </View>
          <View style={styles.IconBtn}>
            <Pressable
              android_ripple={{ color: "#ccc", borderLess: true }}
              style={{ padding: 1 }}
              onPress={handleClose}
            >
              <MaterialIcons
                name="close"
                size={30}
                color={colors.black}
                style={styles.closeIcon}
              />
            </Pressable>
          </View>
        </View>
      )}

      {/* selected Kitchen Container */}
      <View
        style={[
          styles.container,
          isKitchen && { backgroundColor: theme.colors.secondary },
        ]}
      >
        {isKitchen && isCategory && (
          <Text style={[styles.foodTitle, { marginBottom: 10 }]}>
            {categoryInfo.type}
          </Text>
        )}

        {[...Array(6)].map((item, index) => {
          return <FoodCard key={index} />;
        })}
      </View>
    </>
  );
};

export default FoodList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 70,
  },
  swipeItem: {
    minHeight: 130,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 7,
    borderRadius: 8,
    elevation: 4,
  },
  foodImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  foodImageContainer: {
    height: 100,
    alignItems: "center",
  },
  imageWrapper: {
    width: 110,
    height: 100,
    borderRadius: 8,
    elevation: 6,
    borderRadius: 7,
    overflow: "hidden",
  },
  foodContentContainer: {
    paddingHorizontal: 8,
    flexGrow: 1,
    flexDirection: "column",
    width: 0,
  },
  foodContent: {
    marginBottom: 5,
  },
  foodTitle: {
    fontSize: 16,
    color: "#2c2b2b",
    fontWeight: "bold",
    flexShrink: 1,
  },
  foodContentText: {
    fontSize: 18,
    color: colors.gray,
    flexWrap: "wrap",
  },
  actionBtns: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    bottom: 20,
    left: 0,
    right: 0,
    padding: 2,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
    elevation: 7,
  },
  itemCount: {
    fontSize: 20,
    color: colors.white,
    paddingHorizontal: 7,
    fontWeight: "bold",
  },
  foodType: {
    width: 15,
    height: 15,
    borderRadius: 4,
    padding: 2,
    borderWidth: 1,
    marginBottom: 7,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
  },
  divider: {
    width: "95%",
    height: 1,
    marginVertical: 3,
    backgroundColor: "#d8d8d8",
    borderRadius: 50,
  },
  extraContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  extraContentWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  offerText: {
    fontSize: 13,
    color: colors.primary,
    marginHorizontal: 3,
  },
  addBtn: {
    width: 50,
    height: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    bottom: 20,
    zIndex: 2,
    elevation: 7,
  },
  selectedKitchenContainer: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kitchenImageContainer: {
    width: 70,
    height: 70,
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
    fontSize: 18,
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
