import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  ButtonComponent,
  ChoiceLocation,
  ContainerComponent,
  DateTimePickerCpn,
  DropdownPicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../components";
import { userVar } from "../graphqlClient/cache";
import { EventModel } from "../models/EventModel";
import { SelectModel } from "../models/SelectModel";

const initValues = {
  title: "",
  description: "",
  location: {
    title: "",
    address: "",
  },
  imageUrl: "",
  price: "",
  users: [],
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
  const { data: Data_users, error } = useQuery(
    gql`
      query {
        users {
          UserID
          Username
          Password
          Email
          PhotoUrl
        }
      }
    `
  );
  const [values, setValues] = useState<SelectModel[]>([]);

  useEffect(() => {
    if (Data_users) {
      const data = [...values];
      Data_users.users?.map((item: any) =>
        data.push({
          label: item.Email,
          value: item.UserID,
          urlImg: item.PhotoUrl,
        })
      );

      setValues(data);
    }
  }, [Data_users]);

  const handleChangeValue = (key: string, value: string | string[]) => {
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
        <ButtonComponent text="Upload image" onPress={() => {}} type="link" />
        <SpaceComponent height={20}/>
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

        <DropdownPicker
          label="Invited users"
          multiple
          values={values}
          onSelect={(val: string | string[]) => handleChangeValue("users", val)}
          selected={eventData.users}
        />

        <ChoiceLocation />

        <InputComponent
          placeholder="Price"
          value={eventData.price}
          onChange={(val: string) => handleChangeValue("price", val)}
          allowClear
          type="number-pad"
          numberOfLines={3}
        />
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
