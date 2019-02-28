import { useState } from 'react';

const useFormInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return {
    value,
    onChange: handleChange
  };
};

export { useFormInput };
