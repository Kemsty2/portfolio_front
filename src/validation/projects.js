const constraints = {
  projectNew: {
    objet: {
      presence: true,
      length: {        
        minimum: 1,
        message: "^Veuillez saisir le nom du projet"
      }
    },    
    perimetre: {
      presence: true,
      length: {        
        minimum: 1,
        message: "^Veuillez saisir le périmètre du projet"
      }
    },
    objectifs: {
      presence: true,
      length: {        
        minimum: 1,
        message: "^Veuillez saisir les objectifs du projet"
      }
    },
    statut: {
      presence: true,
      length: {        
        minimum: 1,
        message: "^Veuillez choisir le statut du projet"
      }
    },
    client: {
      presence: true,
      length: {        
        minimum: 1,
        message: "^Veuillez choisir le client du projet"
      }
    },
    beneficeClient: {
      presence: true,
      length: {        
        minimum: 1,
        message: "^Veuillez saisir le bénéfice client du projet"
      }
    }
  },
  projectEdit: {
    name: {
      presence: true,
      length: {
        minimum: 2,
        tooShort: "^Au moins %{count} caractères",
        maximum: 50,
        tooLong: "^Au plus %{count} caractères"
      }
    },
    perimetre: {
      presence: true,
      length: {
        minimum: 2,
        tooShort: "^Au moins %{count} caractères",
        maximum: 80,
        tooLong: "^Au plus %{count} caractères"
      }
    },
    objectif: {
      presence: true,
      length: {
        minimum: 2,
        tooShort: "^Au moins %{count} caractères",
        maximum: 80,
        tooLong: "^Au plus %{count} caractères"
      }
    },
    statut: {
      presence: true,
    },
    client: {
      presence: true,
    },
    beneficeClient: {
      presence: true,
    }
  }
};

export default constraints;
