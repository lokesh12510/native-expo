import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  VirtualizedList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../theme/AppTheme";
import {
  clearFood,
  closeKitchen,
  setCurrentPage,
} from "../../app/slices/foodSlice";
import FoodCard from "./FoodCard";
import { useGetFoodListMutation } from "../../app/services/foodListApi";
import FoodListSkeleton from "./FoodListSkeleton";
import SearchField from "../SearchField";
import StyledBtn from "../../theme/uiSinppets/StyledBtn";

const { colors, SIZES } = theme;

const FoodList = () => {
  const dispatch = useDispatch();

  const { isKitchen, kitchenInfo, kitchenId } = useSelector(
    (state) => state.food.kitchen
  );
  const { isCategory, categoryInfo } = useSelector(
    (state) => state.food.category
  );
  const { foodList, currentPage, perPage, hasMore } = useSelector(
    (state) => state.food.food
  );
  const { longitude, latitude } = useSelector((state) => state.user.location);

  const [getFoodList, { isError, isLoading, isSuccess }] =
    useGetFoodListMutation();

  const [search, setSearch] = useState("");

  const handleChangeText = (text) => {
    setSearch(text);
    dispatch(clearFood());
  };

  useEffect(() => {
    getFoodList({
      page: currentPage,
      perPage: perPage,
      latitude: latitude,
      longitude: longitude,
      cook: kitchenId || "",
      food_type: categoryInfo.id || "",
      food_name: search,
    });
  }, [
    currentPage,
    perPage,
    longitude,
    latitude,
    kitchenId,
    categoryInfo.id,
    search,
  ]);

  const handleClose = () => {
    dispatch(clearFood());
    dispatch(closeKitchen());
  };

  const handleLoadMore = () => {
    dispatch(setCurrentPage(currentPage + 1));
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
        <SearchField handleChangeText={handleChangeText} />

        <Text
          style={[
            styles.foodTitle,
            { marginBottom: 15, textTransform: "uppercase" },
          ]}
        >
          {isCategory ? categoryInfo.type : "All Foods"}
        </Text>

        <View style={{ flex: 1 }}>
          {isLoading && foodList.length === 0 ? (
            <FoodListSkeleton />
          ) : foodList && foodList.length > 0 ? (
            foodList.map((item, index) => {
              return <FoodCard item={item} key={index} />;
            })
          ) : (
            <Text style={{ textAlign: "center" }}>No Data Found!</Text>
          )}
          <View style={{ marginVertical: 15, padding: 8 }}>
            {hasMore ? (
              isLoading ? (
                <View>
                  <ActivityIndicator size={"small"} color={colors.primary} />
                </View>
              ) : (
                <StyledBtn
                  type="outlined"
                  title={"Load More"}
                  onPress={handleLoadMore}
                />
              )
            ) : (
              <Text style={{ textAlign: "center" }}>
                Your have reached the end!
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default FoodList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
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
