import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import {
  ButtonComponent,
  ButtonImagePicker,
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
import { appColor } from "../constants/appColor";
import { userVar } from "../graphqlClient/cache";
import { LoadingModal } from "../modals";
import { EventModel, Position } from "../models/EventModel";
import { SelectModel } from "../models/SelectModel";
import { _handleImagePicked } from "../utils/uploadImg";
import { Validate } from "../utils/validate";

const initValues = {
  title: "",
  description: "",
  locationTitle: "Nha Js",
  locationAddress: "",
  position: {
    lat: 0,
    lng: 0,
  },
  imageUrl: "",
  price: "",
  users: [],
  authorId: "",
  category: "",
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = () => {
  const navigation: any = useNavigation();
  const user = useReactiveVar(userVar);
  const [eventData, setEventData] = useState<EventModel>({
    ...initValues,
    authorId: `${user.UserID}`,
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
  const [isVisible, setIsVisible] = useState(false);
  const [values, setValues] = useState<SelectModel[]>([]);
  const [fileSelected, setFileSelected] = useState<any>();
  const [errMess, setErrMess] = useState<string[]>([]);
  const [addressSelected, setAddressSelected] = useState<{
    address: string;
    position: Position;
  }>();
  const [createEvent] = useMutation(
    gql`
      mutation MUTATION_createEvent($eventinput: EventInput!) {
        createEvent(eventinput: $eventinput) {
          EventID
        }
      }
    `,
    {
      // refetchQueries: [
      //   { query: QUERY_denghiTSNTs, variables: { utilsParams: {} } },
      // ],
    }
  );

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

  useEffect(() => {
    const mess = Validate.EventValidation(eventData);
    setErrMess(mess);
  }, [eventData]);

  useEffect(() => {
    addressSelected &&
      setEventData({
        ...eventData,
        locationAddress: addressSelected.address as string,
        position: addressSelected.position as Position,
      });
  }, [addressSelected]);

  const handleChangeValue = (
    key: string,
    value: string | string[] | { lat: number; lng: number }
  ) => {
    let data: any = { ...eventData };
    data[`${key}`] = value;

    setEventData(data);
  };

  const handleFileSelected = (val: any) => {
    setFileSelected(val);
    handleChangeValue("imageUrl", val.uri);
  };

  const handleAddEvent = async () => {
    setIsVisible(true);
    const selectedItemID = handleSelectID(eventData.users);
    if (fileSelected) {
      await _handleImagePicked(fileSelected)
        .then((result) => {
          handlePushEvent({
            ...eventData,
            imageUrl: result as string,
            users: selectedItemID,
          });
          setIsVisible(false);
          navigation.navigate("Explore", {
            screen: 'HomeScreen'
          });
        })
        .catch((err) => console.log("err __handleImagePicked func: ", err));
    } else {
      handlePushEvent({ ...eventData, users: selectedItemID });
      setIsVisible(false);
    }
  };

  const handlePushEvent = async (event: EventModel) => {
    createEvent({
      variables: {
        eventinput: event,
      },
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log("error_createEvent: ", error);
      },
    });
  };

  const handleSelectID = (arr: string[]) => {
    let selectItemID: string[] = [];
    values.map((value: SelectModel) => {
      if (arr.includes(value.label)) {
        selectItemID.push(`${value.value}`);
      }
    });
    return selectItemID;
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent title text="Add New" />
      </SectionComponent>
      <SectionComponent>
        {eventData.imageUrl || fileSelected ? (
          <Image
            source={{
              uri: eventData.imageUrl
                ? eventData.imageUrl
                : fileSelected && fileSelected.uri,
            }}
            style={{ width: "100%", height: 250, marginBottom: 20 }}
            resizeMode="cover"
          />
        ) : (
          <></>
        )}
        <ButtonImagePicker
          onSelect={(type: any, value: any) =>
            type === "url"
              ? handleChangeValue("imageUrl", value)
              : handleFileSelected(value)
          }
        />
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

        <DropdownPicker
          label="Category"
          selected={eventData.category}
          values={[
            {
              label: "Sport",
              value: "sport",
              urlImg: "",
            },
            {
              label: "Food",
              value: "food",
              urlImg: "",
            },
            {
              label: "Art",
              value: "art",
              urlImg: "",
            },
            {
              label: "Music",
              value: "music",
              urlImg: "",
            },
          ]}
          onSelect={(val) => handleChangeValue("category", val)}
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

        <ChoiceLocation
          onSelect={(val: {
            address: string;
            position: { lat: number; lng: number };
          }) => setAddressSelected(val)}
        />

        <InputComponent
          placeholder="Price"
          value={eventData.price}
          onChange={(val: string) => handleChangeValue("price", val)}
          allowClear
          type="number-pad"
          numberOfLines={3}
        />
      </SectionComponent>
      {errMess.length > 0 && (
        <SectionComponent>
          {errMess.map((err) => (
            <TextComponent
              key={err}
              text={err}
              color={appColor.danger}
              styles={{ marginBottom: 12 }}
            />
          ))}
        </SectionComponent>
      )}
      <SectionComponent styles={{ alignItems: "center" }}>
        <ButtonComponent
          disable={errMess.length > 0}
          text="Add New"
          type="primary"
          onPress={handleAddEvent}
        />
      </SectionComponent>

      <LoadingModal visible={isVisible} />
    </ContainerComponent>
  );
};

export default AddNewScreen;
