/* eslint-disable react/prop-types */
import React from 'react';
import ProtoTypes from 'prop-types';
import { Wrapper } from './styles';

export default function DefaultLayout({ children }) {
  return <Wrapper> {children} </Wrapper>;
}

DefaultLayout.protoTypes = {
  children: ProtoTypes.element.isRequired,
};
