import { useEffect, useRef, useState } from 'react';

const hooks = initialFields => {
  const [values, setValue] = useState(() => {
    const initialFieldsState = {};
    initialFields.forEach((field: { fieldName: string }) => {
      initialFieldsState[field.fieldName] = '';
    });
    return initialFieldsState;
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    initialFields.forEach((field: { fieldName: string | number }) => {
      if (values[field.fieldName].trim() === '') {
        newErrors[field.fieldName] = `${field.fieldName} tidak boleh kosong`;
      }
    });
    setErrors(newErrors);
  };

  const clearError = fieldName => {
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    clearError(fieldName);

    setValue(prevFields => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  const refs = {};
  initialFields.forEach(field => {
    refs[field.fieldName] = useRef(null);
  });

  const moveFocus = fieldName => {
    const fieldIndex = initialFields.findIndex(
      field => field.fieldName === fieldName
    );
    const nextField = initialFields[fieldIndex + 1];

    if (nextField) {
      refs[nextField.fieldName].current.focus();
    }
  };

  return {
    refs,
    values,
    errors,
    handleFieldChange,
    validateForm,
    moveFocus,
  };
};
export default hooks;
