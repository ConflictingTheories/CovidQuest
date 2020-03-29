import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  FlatList,
  Button
} from "react-native";
import { styles } from "../../style";

class HomeDrawer extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, padding: 5 }}>
        <View style={{ height: "70%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ marginTop: 50, fontSize: 30, fontWeight: "700", color:"#FFF" }}>
              CovidQuest
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: 0.5,
              padding: 5
            }}
          />
          <View style={{ alignItems: "center", padding: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: "500", color: "#FFF" }}>v0.0.1</Text>
          </View>
        </View>
        <View style={{ borderBottomColor: "white", borderBottomWidth: 0.5 }} />
        <Button
        title="Go to Chat"
        onPress={() => navigate('Chat')}
      />
         <Button
        title="Go to Quests"
        onPress={() => navigate('Arg')}
      />
         <Button
        title="Go to Profile"
        onPress={() => navigate('Profile')}
      />
      </View>
      </SafeAreaView>
    );
  }
}
export default HomeDrawer;
