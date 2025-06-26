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
  backIcon: {
    marginTop: 60,
    alignSelf: "flex-end",
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
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
  titleContainer: {
    backgroundColor: '#1E1E1E',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 40,
    alignItems: "center",
    borderRadius: 20,
  },
  title: {
    color: "#D9D9D9",
    fontSize: 20,
    fontWeight: 700,
  },
  sessionRow: {
    alignItems: "center",
    gap: 10,
    marginVertical: 20,

  },
  titleSession: {
    color: "#D9D9D9",
    fontSize: 16,
    fontWeight: 700,
  },

});

export default styles;
