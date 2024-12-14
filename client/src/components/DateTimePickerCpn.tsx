import DateTimePicker from "@react-native-community/datetimepicker";
import { ArrowDown2, Calendar } from "iconsax-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { appColor } from "../constants/appColor";
import { globalStyles } from "../styles/gloabalStyles";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
import { DateTime } from "../utils/DateTime";
import { fontFamilies } from "../constants/fontFamilies";

interface Props {
  type: "date" | "time";
  label?: string;
  onSelect: (val: any) => void;
}

const DateTimePickerCpn = (props: Props) => {
  const { type, onSelect, label } = props;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChangeDateTime = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    onSelect(currentDate.getTime());
  };

  return (
    <View style={{ flex: 1 }}>
      {label && <TextComponent text={label} styles={{ marginBottom: 8 }} />}
      <RowComponent
        styles={[globalStyles.inputContainer]}
        onPress={() => setShow(true)}
      >
        <TextComponent
          font={fontFamilies.bold}
          text={
            type === "time" ? DateTime.GetTime(date) : DateTime.GetDate(date)
          }
          flex={1}
          styles={{ textAlign: "center" }}
        />
        <Calendar size={22} color={appColor.gray} />
      </RowComponent>
      {show && (
        <DateTimePicker
          // testID="dateTimePicker"
          value={date}
          mode={type}
          is24Hour={true}
          onChange={onChangeDateTime}
        />
      )}
    </View>
  );
};

export default DateTimePickerCpn;
