import { InputType } from '@components/Input/types';
import { useRef, useState } from 'react';
import * as Yup from 'yup';

export type InitialFieldsType = Array<
  {
    fieldName: string;
    type: InputType
    defaultValue?: string | number | any;
    validationSchema?: any;
    editable?: boolean;
    data?: string | Array<{ value: string; label: string }>;
    key?: string; //  for parameter api
  }
>;

const useHookWithSuccess = (
  initialFields,
  onSuccess: (values: Record<string, any>) => void,
  customKey: string = 'key'
) => {

  const scrollRefs = useRef(null);
  const getKeyToUse = (field) => field.key || field[customKey];

  const [values, setValues] = useState<Record<string, any>>(() => {
    const initialFieldsState: Record<string, any> = {};
    console.log('initialFieldsState', initialFields)
    // initialFields.forEach((field) => {
    //   const keyToUse = field[customKey];
    //   initialFieldsState[keyToUse] =
    //     field.type === 'image' || field.type === 'check' ? field.defaultValue || [] : field.defaultValue || '';
    // });
    return initialFieldsState;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = async () => {
    try {
      const schema = Yup.object().shape(
        initialFields.reduce((acc, field) => {
          const keyToUse = getKeyToUse(field); // Determine key to use
          const errMessage = 'Kolom ini tidak boleh kosong'

          acc[keyToUse] = field.validationSchema || Yup.lazy((value) => {
            // if (!field.nullable || field?.validationSchema == undefined) {
            //   return Yup.mixed(); // Return an empty schema for nullable fields
            // }
            if (field.type !== undefined) {
               if (field.type === 'image' || field.type === 'check') {
                return Yup.array().required(errMessage);
              } else if (field.type === 'esriFieldTypeString') {
                if (field.domain !== undefined && typeof values[field.modelName] !== 'string') {
                  return Yup.object().shape({}).required(errMessage);
                } else {
                  return Yup.string().required(errMessage);
                }
              } else {
                if (field['NAME'] == 'Dropdown' || field['DISABLE'] == true) {
                  return Yup.object().shape({}).required(errMessage);
                } else {
                  return Yup.string().required(errMessage);
                }
              }
            } else {
              if (field['NAME'] == "Dropdown" || field['DISABLE'] == true) {
                return Yup.object().shape({}).required(errMessage);
              } else {
                return Yup.string().required(errMessage);
              }
            }
          });
          return acc;
        }, {})
      );

      await schema.validate(values, { abortEarly: false });
      setErrors({});
      successWrapper(values);
    } catch (error) {
      markingError(error);
    }
  };
  const successWrapper = (values) => {
    const transformedValues = {};
    initialFields.forEach((field) => {
      const keyToUse = getKeyToUse(field);
      const value = values[keyToUse];
  
      if (field.type === 'esriFieldTypeSmallInteger' || field.type === 'esriFieldTypeDouble') {
        transformedValues[keyToUse] = Number(value); // Convert to number
      } else if (field.type === 'esriFieldTypeString' && typeof value === 'object' && value.code) {
        transformedValues[keyToUse] = value.code; // Extract 'code' property if the value is an object
      } else {
        transformedValues[keyToUse] = value; // Keep the original value
      }
    });
    console.log('transformedValues', transformedValues)
    onSuccess(transformedValues); // Call onSuccess with transformed values
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
    setErrors((prevErrors) => {
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

  const initializeInputRefs = (initialFields: InitialFieldsType) => {
    const inputRefs: Record<string, React.MutableRefObject<any>> = {};
    initialFields.forEach((field) => {
      const keyToUse = getKeyToUse(field);
      inputRefs[keyToUse] = useRef(null);
    });
    return inputRefs;
  };

  const inputRefs = useRef(initializeInputRefs(initialFields)).current;

  const moveFocus = (fieldName: string) => {
    const fieldIndex = initialFields.findIndex(
      (field) => getKeyToUse(field) === fieldName
    );
    const nextField = initialFields[fieldIndex + 1];

    if (nextField) {
      const nextFieldKey = getKeyToUse(nextField);
      inputRefs[nextFieldKey]?.current?.focus();
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
