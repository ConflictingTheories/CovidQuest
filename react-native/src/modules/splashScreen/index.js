import React, { Component } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { styles } from "../../style";

export default class Page extends Component {
  delay() {
    this.props.navigation.replace("DrawerNav");
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: "#333",
            flex: 1,
            height: "100%",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Text style={{ marginTop: "50%", fontSize: 30, fontWeight: "800", color: "#FFF" }}>
            CovidQuest
        </Text>
          <Image
            style={{ width: 90, height: 90, marginTop: 25 }}
            source={require("../../assets/bioalpha.png")}
          />
        </View>
      </SafeAreaView>
    );
  }
  componentDidMount() {
    setTimeout(() => this.delay(), 200);
  }
}
