import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface Props {
  styles?: StyleProp<ViewStyle>;
}

const AvatarGroup = (props: Props) => {
  const { styles } = props;
  return (
    <View style={[{
      marginVertical: 12
    }]}>
      <Text>AvatarGroup</Text>
    </View>
  );
};

export default AvatarGroup;
