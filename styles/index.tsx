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
    paddingTop: height * 0.03,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    width: width - 90,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 20,
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
  titleItem: {
    fontSize: 20,
    color: "white",
    paddingVertical: 13,
    fontWeight: 700,
  },
  titleProgress: {
    fontSize: 20,
    color: "#4CB3FD",
    fontWeight: 700,
  },
  iconCon: {
    marginTop: 60,
    alignSelf: "flex-end",
    marginRight: 50,
  },

});

export default styles;
