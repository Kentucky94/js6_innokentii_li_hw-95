import React from 'react';
import {Col, FormGroup, Input, Label} from "reactstrap";
import PropTypes from 'prop-types';

const FormElement = props => {
  let inputData = (
    <Input
      type={props.type}
      name={props.propertyName} id={props.propertyName}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      placeholder={props.placeholder}
    />
  );

  if(props.type === 'file'){
    inputData = (
      <Input
        type={props.type}
        name={props.propertyName} id={props.propertyName}
        onChange={props.onChange}
      />
    );
  }

  return (
    <FormGroup row>
      <Label sm={2} for={props.propertyName}>{props.title}</Label>
      <Col sm={10}>
        {inputData}
      </Col>
    </FormGroup>
  );
};

FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FormElement;