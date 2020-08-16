import React from "react";
import { AppLoading } from "expo";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";

const Header = (props) => {
  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 25,
    fontFamily: "VarelaRound_400Regular",
  },
});

export default Header;
