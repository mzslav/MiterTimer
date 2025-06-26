import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: "center",
    justifyContent: "flex-start"
  },
  dataContainer: {
    paddingTop: height * 0.2,
  },
  inputContainer: {
    width: width - 90,
    height: height * 0.3,
    marginTop: 20,
    gap: 20,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: "#C8C8C8",
    height: 50,
    borderRadius: 20,
    paddingLeft: 15,
    justifyContent: "center",
  },
  label: {
    fontWeight: 700,
    fontSize: 12,
    color: '#D0CDCD',
    paddingLeft: 15,
    marginBottom: 5,
  },
  buttonContainer: {
    width: width - 90,
    marginBottom:  height * 0.18,
  },
  linearGradient: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: 'center',
  },
  labelButton: {
    fontWeight: 700,
    fontSize: 20,
    color: '#D0CDCD',
  },
  transparentButton: {
    width: width - 90,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: 'center',
    borderColor: '#D0CDCD',
    borderWidth: 1,
  },
});

export default styles;
