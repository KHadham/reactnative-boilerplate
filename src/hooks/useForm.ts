import { useRef, useState, useEffect } from 'react';

const useHookWithSuccess = (initialFields, onSuccess) => {
  const [values, setValue] = useState(() => {
    const initialFieldsState = {};
    initialFields.forEach((field) => {
      initialFieldsState[field.fieldName] = '';
    });
    return initialFieldsState;
  });
  const [errors, setErrors] = useState({});
  const [formValidated, setFormValidated] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    initialFields.forEach((field) => {
      if (values[field.fieldName].trim() === '') {
        newErrors[field.fieldName] = `${field.fieldName} tidak boleh kosong`;
      }
    });
    setErrors(newErrors);
    setFormValidated(true); // Form has been validated
  };

  useEffect(() => {
    if (formValidated && Object.keys(errors).length === 0) {
      // Call onSuccess when there are no errors and form has been validated
      onSuccess && onSuccess(values);
    }
  }, [errors, onSuccess, formValidated]);

  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  const handleFieldChange = (fieldName, value) => {
    clearError(fieldName);

    setValue((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  const refs = {};
  initialFields.forEach((field) => {
    refs[field.fieldName] = useRef(null);
  });

  const moveFocus = (fieldName) => {
    const fieldIndex = initialFields.findIndex(
      (field) => field.fieldName === fieldName
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
