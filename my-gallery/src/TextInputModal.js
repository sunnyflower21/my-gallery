import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";

export default ({
  modalVisible,
  albumsTitle,
  setAlbumsTitle,
  onSubmitEditing,
  onPressBackdrop,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable onPress={onPressBackdrop} style={{ flex: 1 }}>
          <SafeAreaView
            style={{ width: "100%", position: "absolute", bottom: 0 }}
          >
            <TextInput
              autoFocus
              placeholder="앨범명을 입력해주삼"
              value={albumsTitle}
              onChangeText={setAlbumsTitle}
              onSubmitEditing={onSubmitEditing}
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "grey",
                padding: 10,
              }}
            ></TextInput>
          </SafeAreaView>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};
