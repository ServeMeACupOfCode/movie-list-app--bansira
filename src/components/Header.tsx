import React from "react";
import { Text, View } from "react-native";
import TabList from "./TabList";
import SearchInput from "./SearchInput";

interface HeaderProps {
  genres: string[];
  onTabPress: (genre: string | null) => void;
  selectedTab: string | null;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  genres,
  onTabPress,
  selectedTab,
  onSearch,
}) => {
  return (
    <View style={{ backgroundColor: "#343434" }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#EE4B2B",
          marginLeft: 30,
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        MOVIEFIX
      </Text>
      <SearchInput onSearch={onSearch} />
      <TabList
        genres={genres}
        onTabPress={onTabPress}
        selectedTab={selectedTab}
      />
    </View>
  );
};

export default Header;
