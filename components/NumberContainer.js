import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from '../constants/colors';
import { AppLoading } from "expo";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";

const NumberContainer = (props) => {
  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical:10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        color: Colors.accent,
        fontSize: 22,
        fontFamily: "VarelaRound_400Regular"
    }
});

export default NumberContainer;
