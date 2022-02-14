import React from 'react';
import { Form, Input } from 'antd';

let InputField = ({ key, value, config }) => (
  <Input defaultValue={value} name={key} {...config} />
);

let InputGroup = ({ key, value, config }) => (

  
  <Input defaultValue={value} name={key} {...config} />
);

export default InputField;
