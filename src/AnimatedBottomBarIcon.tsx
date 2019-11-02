import React from 'react';
import {TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

type Props = {
  name: string;
  selected: boolean;
  onPress: () => void;
};

export function AnimatedBottomBarIcon(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon
        name={props.name}
        size={24}
        color={props.selected ? 'black' : 'lightgray'}
      />
    </TouchableOpacity>
  );
}
