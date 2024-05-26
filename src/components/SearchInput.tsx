import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native";

interface SearchInputProps extends TextInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, ...rest }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleTextChange = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  return (
    <TextInput
      {...rest}
      style={{
        marginBottom: 10,
        height: 40,
        backgroundColor: "#FFF",
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 10,
      }}
      placeholder="Search movies..."
      value={searchQuery}
      onChangeText={handleTextChange}
    />
  );
};

export default SearchInput;
