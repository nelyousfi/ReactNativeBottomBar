import React from 'react';
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  ViewStyle,
  Animated,
} from 'react-native';

import {AnimatedBottomBarIcon} from './AnimatedBottomBarIcon';

type Props = {
  icons: string[];
  onSelect: (index: number) => void;
};

const ICON_WIDTH = 24;
const DOT_WIDTH = 8;

export function AnimatedBottomBar(props: Props) {
  function calculatePosition(index: number): number {
    const distanceBetweenIcons =
      (width - ICON_WIDTH * props.icons.length) / (props.icons.length - 1);
    return (
      (distanceBetweenIcons + ICON_WIDTH) * index +
      ICON_WIDTH / 2 -
      DOT_WIDTH / 2
    );
  }

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [positionX] = React.useState(new Animated.Value(calculatePosition(0)));

  function onSelect(index: number): void {
    setSelectedIndex(index);
    props.onSelect(index);
    Animated.timing(positionX, {
      toValue: calculatePosition(index),
      duration: 300,
    }).start();
  }

  function onLayout(e: LayoutChangeEvent) {
    setWidth(e.nativeEvent.layout.width);
  }

  function dotPosition() {
    return {
      transform: [
        {
          translateX: positionX,
        },
      ],
    };
  }

  return (
    <View style={styles.bottomBar} onLayout={onLayout}>
      <Animated.View style={[styles.dot, dotPosition()]} />
      {props.icons.map((icon, index) => (
        <AnimatedBottomBarIcon
          name={icon}
          selected={index === selectedIndex}
          onPress={() => onSelect(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    marginHorizontal: 40,
    marginTop: 10,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    width: DOT_WIDTH,
    height: DOT_WIDTH,
    backgroundColor: 'black',
    borderRadius: DOT_WIDTH / 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
