import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const defaultAlbum = [
  {
    id: 1,
    title: "Default",
  },
];

export const useGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState(defaultAlbum);
  const [modalVisible, setModalVisible] = useState(false);
  const [albumsTitle, setAlbumsTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id,
      };
      setImages([...images, newImage]);
    }
  };

  const dleteAlbum = (albumId) => {
    Alert.alert("delete?", "", [
      { style: "cancel", text: "nope" },
      {
        text: "Yes",
        onPress: () => {
          const newAlbums = albums.filter((album) => album.id !== albumId);
          setAlbums(newAlbums);
        },
      },
    ]);
  };

  const deleteImage = (imageId) => {
    if (albumId === defaultAlbum.id) {
      Alert.alert("기본은 삭제 안됨");
      return;
    }
    Alert.alert("delete?", "", [
      { style: "cancel", text: "nope" },
      {
        text: "Yes",
        onPress: () => {
          const newImages = images.filter((image) => image.id !== imageId);
          setImages(newImages);
          setSelectedAlbum(defaultAlbum);
        },
      },
    ]);
  };

  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openDrodown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;

    const newAlbum = { id: lastId + 1, title: albumsTitle };
    setAlbums([...albums, newAlbum]);
  };

  const filteredImages = images.filter(
    (image) => (image.albumId = selectedAlbum.id)
  );

  const imageWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "",
    },
  ];

  return {
    images,
    pickImage,
    deleteImage,
    imageWithAddButton,
    selectedAlbum,
    modalVisible,
    openModal,
    closeModal,
    albumsTitle,
    setAlbumsTitle,
    addAlbum,
    albums,
    openDrodown,
    closeDropdown,
    isDropdownOpen,
    selectAlbum,
    dleteAlbum,
  };
};
