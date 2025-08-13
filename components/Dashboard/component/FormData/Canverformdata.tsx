const convertToFormData = <T extends object>(data: T): FormData => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof T];

    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item)); 
    }  else if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
    }
  });

  return formData;
};

export default convertToFormData;

// const formData = convertToFormData<Book>(bookData);