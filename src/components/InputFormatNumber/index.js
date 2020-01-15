import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormatNumberInput from 'react-number-format';

import { useField } from '@rocketseat/unform';

export default function InputFormatNumber({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [valued, setValued] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      clearValue: valueRef => {
        setValued(null);
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  useEffect(() => {
    setValued(defaultValue);
  }, [defaultValue]); // eslint-disable-line

  return (
    <>
      <FormatNumberInput
        name={fieldName}
        value={valued}
        ref={ref}
        onValueChange={values => setValued(values.value)}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

InputFormatNumber.propTypes = {
  name: PropTypes.string.isRequired,
};
