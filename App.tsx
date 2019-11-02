import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';

import {AnimatedBottomBar} from './src/AnimatedBottomBar';

const icons: string[] = ['home', 'lock', 'user'];

export default function App() {
  const [selectedIcon, setSelectedIcon] = React.useState(icons[0]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Selected icon is: #{selectedIcon}</Text>
      </View>
      <AnimatedBottomBar
        icons={icons}
        onSelect={index => setSelectedIcon(icons[index])}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});
