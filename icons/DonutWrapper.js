import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Donut from './donut';
import DonutProgress from './DonutProgress';

export default function DonutWrapper({ progress, goal }) {
  return (
    <View style={styles.container}>
      <Donut />
      <DonutProgress progress={progress} />
      <View style={styles.textContainer}>
        <View style={styles.goalContainer}>
             <Text style={[styles.progressTextGoal, {fontSize: 15}]}>{`${((goal / 3600))} h`}</Text>
        </View>
        <Text style={styles.progressText}>{`${progress}%`}</Text>
        <Text style={styles.progressTextLow}>{`Your Total Time`}</Text>
        <View style={styles.goalContainer}>
             <Text style={[styles.progressTextGoal, {color: 'white'}]}>{`${((goal * progress) / 100).toFixed(0)} s`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 320,
    position: 'relative',
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  textContainer: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', 
    alignItems: 'center',    
  },
  progressText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#D9D9D9', 
  },
  progressTextLow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D9D9D9', 
    marginBottom: 10,
  },
  progressTextGoal: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4CB3FD', 
  },
  goalContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  }
});