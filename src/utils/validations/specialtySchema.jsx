
  export const valName = (value) => {
    
    if (!value) {
        return 'Nombre es requerido';
    }
  
    if (value.trim().length < 3) {
      return 'Nombre no es válido';
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
  