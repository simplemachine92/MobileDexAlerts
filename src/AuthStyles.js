import { StyleSheet } from 'react-native';

export const AuthStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    header: {
        fontSize: 20
    },
    buttonContainer: {
        flexDirection: "row",
        flex: 0.1,
        height: 20,
        justifyContent: "space-evenly",
        alignSelf: "stretch"
    },
    buttonTextStyle: {
        //fontFamily: "Decide Later"
        fontSize: 18,
    },
    textInput: {
      height: 35,
      width: "80%",
      borderColor: "gray",
      textAlign: "center",
      borderRadius: 10,
      borderWidth: 1,
      marginTop: 10,
      marginBottom: 10
    }
  });