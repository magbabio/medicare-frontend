export const valCedula = (value) => {
  
    if (!value) {
        return 'Cédula es requerida';
      }
  
      if (value.trim().length < 7) {
        return 'Cédula no es válida';
    }
  
    if (value.trim().length > 10) {
        return 'Cédula no debe tener más de 10 caracteres';
    }
  
    return null;
  
  };

  export const valFirstName = (value) => {
    if (!value) {
      return 'Nombre es requerido';
    }
  
    if (/\d/.test(value)) {
      return 'Nombre no puede contener números';
    }
  
    if (value.trim().length < 3) {
        return 'Nombre no es válido';
    }
  
    if (value.trim().length > 50) {
        return 'Nombre no debe tener más de 50 caracteres';
    }
  
    return '';
  };
  
  export const valLastName = (value) => {
    if (!value) {
      return 'Apellido es requerido';
    }
  
    if (/\d/.test(value)) {
      return 'Apellido no puede contener números';
    }
  
    if (value.trim().length < 3) {
        return 'Apellido no es válido';
    }
  
    if (value.trim().length > 50) {
        return 'Apellido no debe tener más de 50 caracteres';
    }
  
    return '';
  };
  
  export const valPhone = (value) => {
    
    if (value.length !== 0 && !/^[\d-]+$/.test(value)) {
      return 'Teléfono sólo debe contener números y el carácter -';
    }
  
    if (value.length !== 0 && value.length !== 12) {
        return 'Teléfono no es válido';
    }
  
    return '';
  };
  
  export const valEmail = (value) => {
    if (!value) {
      return 'Correo electrónico es requerido';
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(value)) {
      return 'Correo electrónico no tiene un formato válido';
    }
  
    return '';
  };

