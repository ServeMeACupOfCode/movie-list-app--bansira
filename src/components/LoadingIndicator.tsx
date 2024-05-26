import React from "react";
import { Text, View } from "react-native";

const LoadingIndicator: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
        Loading...
      </Text>
    </View>
  );
};

export default LoadingIndicator;
