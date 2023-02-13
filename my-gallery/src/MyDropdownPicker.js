import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
const headerHeight = 50;

export default ({
  selectedAlbumTitle,
  onPressAddAlbum,
  onPressHeader,
  isDropdownOpen,
  onPressAlum,
  albums,
  selectedAlbumId,
  onLongPressAlbum,
}) => {
  console.log("albums:", albums);
  console.log("albums:", selectedAlbumTitle);
  return (
    <View>
      <Pressable
        onPress={onPressHeader}
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{selectedAlbumTitle}</Text>
        <SimpleLineIcons
          name={isDropdownOpen ? "arrow-down" : "arrow-up"}
          size={12}
          color="black"
          style={{ marginLeft: 8 }}
        />
        <TouchableOpacity
          onPress={onPressAddAlbum}
          style={{
            position: "absolute",
            height: headerHeight,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </TouchableOpacity>
      </Pressable>
      {isDropdownOpen && (
        <View
          style={{
            position: "absolute",
            top: headerHeight,
            width: "100%",
            height: 100,
            borderTopColor: "lightgrey",
            borderTopWidth: 0.5,
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.5,
          }}
        >
          {albums.map((album, idx) => {
            const isSelectedAlbum = album.id === selectedAlbumId;
            return (
              <TouchableOpacity
                key={`album-${idx}`}
                onPress={() => onPressAlum(album)}
                onLongPress={() => {
                  onLongPressAlbum(album.id);
                }}
                activeOpacity={1}
                style={{
                  paddingVertical: 12,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Text
                  style={{ fontWeight: isSelectedAlbum ? "bold" : undefined }}
                >
                  {album.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
