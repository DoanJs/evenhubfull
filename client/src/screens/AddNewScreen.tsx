import { gql, useQuery, useReactiveVar } from "@apollo/client";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@react-native-firebase/storage";
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
import { EventModel } from "../models/EventModel";
import { SelectModel } from "../models/SelectModel";
import { Validate } from "../utils/validate";
import storage from "@react-native-firebase/storage";

const initValues = {
  title: "",
  description: "",
  // locationTitle: "",
  // locationAddress: "",
  // position: {
  //   lat: '',
  //   long: ''
  // },
  location: {
    title: "",
    address: "",
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
  const [fileSelected, setFileSelected] = useState<any>();
  const [errMess, setErrMess] = useState<string[]>([]);

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

  const handleChangeValue = (key: string, value: string | string[]) => {
    let data: any = { ...eventData };
    data[`${key}`] = value;

    setEventData(data);
  };

  const handleFileSelected = (val: any) => {
    setFileSelected(val);
    handleChangeValue("imageUrl", val.uri);
  };

  const handleAddEvent = async () => {
    if (fileSelected) {
      const filename = `${fileSelected.filename ?? `image-${Date.now()}`}.${
        fileSelected.uri.split(".")[fileSelected.uri.split(".").length - 1]
      }`;
      const path = `image/${filename}`;

      const res = storage().ref(path).putFile(fileSelected.uri);

      res.on(
        "state_changed",
        (snap) => {
          console.log(snap.bytesTransferred);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage()
            .ref(path)
            .getDownloadURL()
            .then((url) => console.log(url));
        }
      );
      console.log(filename);
    } else {
      console.log(eventData);
    }
  };

  // async function uploadImageAsync(uri: any) {
  //   // Why are we using XMLHttpRequest? See:
  //   // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function (e) {
  //       console.log(e);
  //       reject(new TypeError("Network request failed"));
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("GET", uri, true);
  //     xhr.send(null);
  //   });

  //   const fileRef = ref(getStorage(), uuidv4());
  //   const result = await uploadBytes(fileRef, blob);

  //   // We're done with the blob, close and release it
  //   blob.close();

  //   return await getDownloadURL(fileRef);
  // }

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
    </ContainerComponent>
  );
};

export default AddNewScreen;
function uuidv4(): string | undefined {
  throw new Error("Function not implemented.");
}
