const constraints = {
    membreNew: {
      nom: {
        presence: true,
        length: {        
          minimum: 1,
          message: "^Veuillez saisir le nom du membre"
        }
      },
      type: {
        presence: true,
        length: {        
          minimum: 1,
          message: "^Veuillez saisir le type de membre"
        }
      }
    }    
  };
  
  export default constraints;
  