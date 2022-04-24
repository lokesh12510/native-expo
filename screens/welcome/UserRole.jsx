import { View, Text, Button } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { roleSwitch } from "../../app/authSlice/authSlice";

const UserRoleScreen = () => {
  const dispatch = useDispatch();
  const handleRoleSelect = (role) => {
    dispatch(roleSwitch({ role }));
  };
  return (
    <View>
      <Text>userRole</Text>
      <View style={{ marginBottom: 10 }}>
        <Button
          title="Customer"
          onPress={() => handleRoleSelect("ROLE_CUSTOMER")}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button title="Cook" onPress={() => handleRoleSelect("ROLE_COOK")} />
      </View>
    </View>
  );
};

export default UserRoleScreen;
