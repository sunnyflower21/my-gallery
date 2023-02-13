import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MyDropdownPicker from "./src/MyDropdownPicker.js";
import TextInputModal from "./src/TextInputModal.js";
import { useGallery } from "./src/use-gallery.js";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function App() {
  const {
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
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };
  const onPressAddAlbum = () => {
    openModal();
  };
  const onSubmitEditing = () => {
    if (albumsTitle === "") return;
    addAlbum();
    setAlbumsTitle("");
    closeModal();
  };

  const onPressBackdrop = () => {
    closeModal();
  };
  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDrodown();
    }
  };

  const onPressAlum = (album) => {
    selectAlbum(album);
    closeDropdown();
  };

  const onLongPressAlbum = (albumId) => {
    dleteAlbum();
  };

  const renderItem = ({ item: { id, uri }, index }) => {
    const onLongPress = () => {
      deleteImage(id);
    };
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "100", fontSize: 45 }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onLongPress={onLongPress}>
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        ></Image>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Album dropdown */}
      <MyDropdownPicker
        selectedAlbumTitle={selectedAlbum.title}
        selectedAlbumId={selectedAlbum.id}
        onPressAddAlbum={onPressAddAlbum}
        onPressHeader={onPressHeader}
        isDropdownOpen={isDropdownOpen}
        albums={albums}
        onPressAlum={onPressAlum}
        onLongPressAlbum={onLongPressAlbum}
      ></MyDropdownPicker>
      {/* add alum text input */}
      <TextInputModal
        onSubmitEditing={onSubmitEditing}
        albumsTitle={albumsTitle}
        setAlbumsTitle={setAlbumsTitle}
        modalVisible={modalVisible}
        onPressBackdrop={onPressBackdrop}
      ></TextInputModal>
      {/* image lsit */}
      <FlatList
        numColumns={3}
        data={imageWithAddButton}
        renderItem={renderItem}
        style={{ zIndex: -1 }}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  renderContainer: {},
});
