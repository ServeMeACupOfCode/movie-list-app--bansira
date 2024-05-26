import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface TabListProps {
  genres: (string | null)[];
  onTabPress: (genre: string | null) => void;
  selectedTab: string | null;
}

const TabList: React.FC<TabListProps> = ({
  genres,
  onTabPress,
  selectedTab,
}) => {
  const renderItem = ({ item }: { item: string | null }) => (
    <TouchableOpacity
      onPress={() => onTabPress(item)}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        backgroundColor: selectedTab === item ? "#FF4433" : "#36454F",
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "white" }}>{item === null ? "All" : item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FlatList
        horizontal
        data={[null, ...genres]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingVertical: 10,
          marginLeft: 20,
          marginBottom: 10,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
export default TabList;
