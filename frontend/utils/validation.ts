export interface ValidationErrors {
  fullName?: string;
  email?: string;
  age?: string;
  city?: string;
  state?: string;
  country?: string;
}

export const validateBasicInfo = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!data.fullName || data.fullName.trim() === '') {
    errors.fullName = 'Full Name is required';
  }
  
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }
  
  if (!data.age || data.age.trim() === '') {
    errors.age = 'Age is required';
  } else if (isNaN(Number(data.age)) || Number(data.age) < 1 || Number(data.age) > 150) {
    errors.age = 'Please enter a valid age (1-150)';
  }
  
  return errors;
};

export const validateAddressInfo = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!data.city || data.city.trim() === '') {
    errors.city = 'City is required';
  }
  
  if (!data.state || data.state.trim() === '') {
    errors.state = 'State is required';
  }
  
  if (!data.country || data.country.trim() === '') {
    errors.country = 'Country is required';
  }
  
  return errors;
};
