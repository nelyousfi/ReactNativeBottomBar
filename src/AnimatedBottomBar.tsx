import React from 'react';
import {View, StyleSheet, LayoutChangeEvent, Animated} from 'react-native';

import {AnimatedBottomBarIcon} from './AnimatedBottomBarIcon';

type Props = {
  icons: string[];
  defaultSelectedIndex?: number;
  onSelect: (index: number) => void;
};

const ICON_WIDTH = 24;
const DOT_WIDTH = 8;

export function AnimatedBottomBar(props: Props) {
  if (props.icons.length < 2) {
    throw new Error('You should pass at least 2 icons');
  }

  if (
    props.defaultSelectedIndex &&
    props.defaultSelectedIndex > props.icons.length - 1
  ) {
    throw new Error(
      'The default selected index should be less than the number of icons',
    );
  }

  function calculatePosition(index: number): number {
    const distanceBetweenIcons =
      (width - ICON_WIDTH * props.icons.length) / (props.icons.length - 1);
    return (
      (distanceBetweenIcons + ICON_WIDTH) * index +
      ICON_WIDTH / 2 -
      DOT_WIDTH / 2
    );
  }

  const [selectedIndex, setSelectedIndex] = React.useState(
    props.defaultSelectedIndex || 0,
  );
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

  React.useEffect(() => {
    if (!width) return;
    positionX.setValue(calculatePosition(props.defaultSelectedIndex || 0));
  }, [width]);

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
    <View>
      <View style={styles.bottomBar} onLayout={onLayout}>
        <Animated.View style={[styles.dot, dotPosition()]} />
        {props.icons.map((icon, index) => (
          <AnimatedBottomBarIcon
            key={`icon_${index}_${icon}`}
            name={icon}
            selected={index === selectedIndex}
            onPress={() => onSelect(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    marginHorizontal: 40,
    marginTop: 10,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    width: DOT_WIDTH,
    height: DOT_WIDTH,
    backgroundColor: 'black',
    borderRadius: DOT_WIDTH / 2,
    position: 'absolute',
    bottom: 4,
    left: 0,
  },
});
