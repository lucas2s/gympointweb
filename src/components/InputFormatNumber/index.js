import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-number-format';

import { useField } from '@rocketseat/unform';

export default function InputCurrency({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [valued, setValued] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      clearValue: valueRef => {
        valueRef.value = '';
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <CurrencyInput
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

InputCurrency.propTypes = {
  name: PropTypes.string.isRequired,
};
