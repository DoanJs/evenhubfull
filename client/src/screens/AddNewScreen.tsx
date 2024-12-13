import React, { useState } from "react";
import { Text, View } from "react-native";
import { EventModel } from "../models/EventModel";
import {
  ButtonComponent,
  ChoiceLocation,
  ContainerComponent,
  DateTimePickerCpn,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../components";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../graphqlClient/cache";

const initValues = {
  title: "",
  description: "",
  location: {
    title: "",
    address: "",
  },
  imageUrl: "",
  users: [""],
  authorId: "",
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = () => {
  const user = useReactiveVar(userVar);
  const [eventData, setEventData] = useState<EventModel>({
    ...initValues,
    authorId: user.UserID,
  });

  const handleChangeValue = (key: string, value: string) => {
    let data: any = { ...eventData };
    data[`${key}`] = value;

    setEventData(data);
  };

  const handleAddEvent = () => {
    console.log(eventData);
  };
  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent title text="Add New" />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeholder="Title"
          allowClear
          value={eventData.title}
          onChange={(val: string) => handleChangeValue("title", val)}
        />
        <InputComponent
          placeholder="description"
          value={eventData.description}
          onChange={(val: string) => handleChangeValue("description", val)}
          multiline={true}
          allowClear
          numberOfLines={3}
        />

        <RowComponent justify="center">
          <DateTimePickerCpn
            type="time"
            label="Start at: "
            onSelect={(val: any) => handleChangeValue("startAt", val)}
          />
          <SpaceComponent width={20} />
          <DateTimePickerCpn
            type="time"
            label="End at: "
            onSelect={(val: any) => handleChangeValue("endAt", val)}
          />
        </RowComponent>
        <DateTimePickerCpn
          type="date"
          label="Date: "
          onSelect={(val: any) => handleChangeValue("date", val)}
        />

        <ChoiceLocation />
      </SectionComponent>
      <SectionComponent styles={{ alignItems: "center" }}>
        <ButtonComponent
          text="Add New"
          type="primary"
          onPress={handleAddEvent}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
