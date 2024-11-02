
export const valNumber = (value) => {
    
    if (!value) {
        return 'Número es requerido';
    }
  
    return null;
  
  };
  
  
  export const valDescription = (value) => {
    
    if (!value) {
        return 'Descripción es requerida';
    }
  
    if (value.trim().length < 3) {
      return 'Descripción no es válida';
    }
  
    return null;
  
  };