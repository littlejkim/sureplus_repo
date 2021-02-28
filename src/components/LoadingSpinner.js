// public imports
import React, { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export const LoadingSpinner = (props) => {
  return <Spinner visible={props.loading} animation="fade" />;
};
