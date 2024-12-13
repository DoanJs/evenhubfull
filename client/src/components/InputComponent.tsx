import React, { ReactNode, useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { appColor } from "../constants/appColor";
import { globalStyles } from "../styles/gloabalStyles";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardTypeOptions;
  inputStyles?: StyleProp<ViewStyle>;
  onEnd?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  styles?: StyleProp<ViewStyle>;
}
const InputComponent = (props: Props) => {
  const {
    inputStyles,
    value,
    placeholder,
    onChange,
    affix,
    suffix,
    isPassword,
    allowClear,
    type,
    onEnd,
    multiline,
    numberOfLines,
    styles,
  } = props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

  return (
    <View
      style={[
        globalStyles.inputContainer,
        inputStyles,
        {
          alignItems: multiline ? "flex-start" : "center",
          minHeight: multiline ? 100 : 56,
        },
        styles,
      ]}
    >
      {affix ?? affix}
      <TextInput
        style={[
          globalStyles.text,
          {
            paddingHorizontal: affix || suffix ? 12 : 0,
          },
          globalStyles.input,
        ]}
        value={value}
        placeholder={placeholder ?? ""}
        onChangeText={(val) => onChange(val)}
        secureTextEntry={isShowPass}
        placeholderTextColor={"#747688"}
        keyboardType={type ?? "default"}
        onEndEditing={onEnd}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {suffix ?? suffix}

      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPass(!isShowPass) : () => onChange("")
        }
      >
        {isPassword ? (
          <FontAwesome
            name={isShowPass ? "eye-slash" : "eye"}
            size={22}
            color={appColor.gray}
          />
        ) : (
          value.length > 0 &&
          allowClear && (
            <AntDesign name="close" size={22} color={appColor.gray} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColor.gray3,
    width: "100%",
    minHeight: 56,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: appColor.white,
    marginBottom: 19,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
});
