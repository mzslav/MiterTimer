import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 40,
  },
  input: {
    backgroundColor: "#1E1E1E",
    width: '100%',
    height: 50,
    marginTop: 30,
    paddingLeft: 20,
    borderRadius: 20,
    color: '#D0CDCD'
  },
  backIcon: {
    marginTop: 60,
    alignSelf: "flex-end",
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: height * 0.15,
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

});

export default styles;
