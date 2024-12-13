import React, { useState } from "react";
import { Text, View } from "react-native";
import { EventModel } from "../models/EventModel";
import {
  ButtonComponent,
  ChoiceLocation,
  ContainerComponent,
  InputComponent,
  SectionComponent,
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
        {/* <InputComponent
          placeholder="Title Address"
          value={eventData.location.title}
          onChange={(val: string) => handleChangeValue("", val)}
          multiline={true}
          allowClear
          numberOfLines={3}
        /> */}
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
