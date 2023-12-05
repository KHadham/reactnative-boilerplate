import {  InputType } from '@components/Input/types';
import { useRef, useState } from 'react';
import * as Yup from 'yup';

export type InitialFieldsType = Array<
  {
    fieldName: string;
    type: InputType
    defaultValue?: string | number |any;
    validationSchema?: any; 
    editable?: boolean;
    data?: string | Array<{ value: string; label: string }>;
    key?: string; //  for parameter api
  } 
>;

const useHookWithSuccess = (initialFields: InitialFieldsType, onSuccess: Function,customKey: string = 'key') => {
  const scrollRefs = useRef(null);
  const getKeyToUse = (field: { [key: string]: any }) => field[customKey] 

  const [values, setValues] = useState(() => {
    const initialFieldsState = {};
    initialFields.forEach((field) => {
      const keyToUse = getKeyToUse(field); // Determine key to use
      if (field.type === 'image' || field.type === 'check') {
        initialFieldsState[keyToUse] = field.defaultValue || [];
      } else {
        initialFieldsState[keyToUse] = field.defaultValue || '';
      }
    });
    return initialFieldsState;
  });

  const [errors, setErrors] = useState({});

 
  
  const validateForm = async () => {
    try {
      const schema = Yup.object().shape(
        initialFields.reduce((acc, field) => {
          const keyToUse = getKeyToUse(field); // Determine key to use
          acc[keyToUse] = field.validationSchema || Yup.lazy((value) => {
            console.log('value', value)
            if (field.type !== undefined) {
              console.log('field1', field)
              switch (field.type) {
                case 'number':
                  return Yup.number().required(`${field.fieldName} tidak boleh kosong`);
                case 'image':
                case 'check':
                  return Yup.array().required(`${field.fieldName} tidak boleh kosong`);
                default:
                  return Yup.string().required(`${field.fieldName} tidak boleh kosong`);
              }
            } else {
              console.log('field2', field['NAME'])
              if (field['NAME'] == "Dropdown"||field['DISABLE'] == true) {
                return Yup.object().shape({}).required(`${field.fieldName} tidak boleh kosong`);
              } else {
                return Yup.string().required(`${field.fieldName} tidak boleh kosong`);
              }
            }
            
          });
          return acc;
        }, {})
      );
  
      await schema.validate(values, { abortEarly: false });
      setErrors({});
      onSuccess(values);
    } catch (error) {
      markingError(error)
    }
  };

  const markingError = (error) => {
    try {
      const sortedFields = initialFields
        .filter(obj => obj['NAME'] !== 'Hidden')
        .sort((a, b) => a['SORT'] - b['SORT']);
      
      const newErrors = {};
      let firstErrorIndex = -1;
  
      sortedFields.forEach((field, index) => {
        error.inner.forEach((err) => {
          const keyToUse = getKeyToUse(field); // Determine key to use
          if (err.path === keyToUse && firstErrorIndex === -1) {
            console.log('err', err.path);
            firstErrorIndex = index;
          }
          newErrors[err.path] = err.message;

        });
      });
  
      setErrors(newErrors);
  
      if (firstErrorIndex !== -1) {
        scrollRefs.current.scrollToIndex({ animated: true, index: firstErrorIndex });
      }
    } catch (error) {
      // console.log('error markingError', error);
    }
  };


  const clearError = (fieldKey: string | number) => {
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldKey];
      return updatedErrors;
    });
  };

  const handleFieldChange = ({
    fieldKey = '',
    value,
    removedFieldKey = null,
  }: { fieldKey: string; value: any; removedFieldKey?: string | string[] }) => {
    clearError(fieldKey);
    
    setValues((prevFields) => ({
      ...prevFields,
      [fieldKey]: value,
    }));
    if (Array.isArray(removedFieldKey)) {
      removedFieldKey.forEach((key) => {
        setValues((prevFields) => ({
          ...prevFields,
          [key]: '',
        }));
      });
    } else if (removedFieldKey !== null) {
      setValues((prevFields) => ({
        ...prevFields,
        [removedFieldKey]: '',
      }));
    }
  };

  const inputRefs = {};
  initialFields.forEach(field => {
    const keyToUse = getKeyToUse(field); // Determine key to use
    // console.log('keyToUse', keyToUse)
    // inputRefs[keyToUse] = useRef(null);
  });

  const moveFocus = (fieldName: string) => {
    const fieldIndex = initialFields.findIndex(
      field => getKeyToUse(field) === fieldName // Determine key to use
    );
    const nextField = initialFields[fieldIndex + 1];

    if (nextField) {
      const nextFieldKey = getKeyToUse(nextField); // Determine key to use
      inputRefs[nextFieldKey].current.focus();
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
