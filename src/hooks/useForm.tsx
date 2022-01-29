import {useState} from 'react';

export const useForm = <T extends Object>(customForm: T) => {
  const [form, setForm] = useState(customForm);

  const handleForm = (value: string, field: keyof T) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return {
    ...form,
    form,
    handleForm,
  };
};
