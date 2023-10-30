import { useRef, useState, useEffect } from 'react';

const useHookWithSuccess = (initialFields, onSuccess) => {
  const scrollRefs = useRef(null); // Create a ref for the FlatList
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
    let firstErrorPosition = null;

    initialFields.forEach((field, index) => {
      if (values[field.fieldName].trim() === '') {
        newErrors[field.fieldName] = `${field.fieldName} tidak boleh kosong`;
      }
      // todo 
      // Store the position of the first error
      if (firstErrorPosition === null) {
        firstErrorPosition = index;
      }
    });
    setErrors(newErrors);
    // inputRefs[initialFields[0]].current.blur();
    if (Object.keys(newErrors).length === 0) {
      onSuccess(values);
    } else {
      if (firstErrorPosition !== null && scrollRefs.current) {
        scrollRefs.current.scrollToIndex({
          index: firstErrorPosition,
          animated: true,
        });
      }
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

  const inputRefs = {};
  initialFields.forEach(field => {
    inputRefs[field.fieldName] = useRef(null);
  });

  const moveFocus = fieldName => {
    const fieldIndex = initialFields.findIndex(
      field => field.fieldName === fieldName
    );
    const nextField = initialFields[fieldIndex + 1];

    if (nextField) {
      inputRefs[nextField.fieldName].current.focus();
    }
  };

  return {
    inputRefs,
    scrollRefs,
    values,
    errors,
    handleFieldChange,
    validateForm,
    moveFocus,
  };
};

export default useHookWithSuccess;
