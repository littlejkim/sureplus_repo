// public imports
import React from 'react';
import { Modalize } from 'react-native-modalize';

// bottom modal (need to customize)
export const BottomModal = (props) => {
  return (
    <Modalize
      ref={props.modalizeRef}
      modalHeight={props.height}
      panGestureEnabled={false}
      onOpen={() => console.log('modal opened')}
      onClose={() => console.log('modal closed')}
    />
  );
};
