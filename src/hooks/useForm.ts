import { useRef, useState, useEffect } from 'react';

const useHookWithSuccess = (initialFields, onSuccess) => {
  console.log('initialFields :>> ', initialFields);
  const [values, setValue] = useState(() => {
    const initialFieldsState = {};
    initialFields.forEach(field => {
      initialFieldsState[field.fieldName] = field.defaultValue || '';
    });
    return initialFieldsState;
  });

  const [errors, setErrors] = useState({});
  const [formValidated, setFormValidated] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    initialFields.forEach(field => {
      if (values[field.fieldName].trim() === '') {
        newErrors[field.fieldName] = `${field.fieldName} tidak boleh kosong`;
      }
    });
    setErrors(newErrors);
    // refs[initialFields[0]].current.blur();
    if (Object.keys(newErrors).length === 0) {
      onSuccess(values);
    }
  };

  const clearError = fieldName => {
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  const handleFieldChange = (fieldName, value) => {
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

export default useHookWithSuccess;
