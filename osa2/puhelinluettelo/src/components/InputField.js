import React from 'react'

const InputField = ({ text, valuePointer, onChangeFunc }) => (
  <div>
    {text} <input value={valuePointer} onChange={onChangeFunc} />
  </div>
)

export default InputField