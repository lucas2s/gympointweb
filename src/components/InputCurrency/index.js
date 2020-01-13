import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-number-format';

import { useField } from '@rocketseat/unform';

export default function InputCurrency({ name, value, handleChangeValue }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

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
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale
        prefix="R$ "
        name={fieldName}
        value={value}
        onValueChange={handleChangeValue}
        ref={ref}
        placeholder="R$ 100,00"
      />
      {error && <span>{error}</span>}
    </>
  );
}

InputCurrency.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChangeValue: PropTypes.func.isRequired,
};

InputCurrency.defaultProps = {
  value: null,
};
