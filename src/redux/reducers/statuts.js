import { StatutsActions } from "../actions/types";
import lodash from "lodash";
const initialState = {  
  listOfStatuts: [],  
};

export function statutsReducer(state = initialState, action) {
  const oldState = lodash.cloneDeep(state);  
  const newStatut = action.statut;
  let available = 0;  

  switch (action.type) {    
    case StatutsActions.ADD_STATUT:
      newStatut.id = action.statut.id;
      available = lodash.findIndex(oldState.listOfStatuts, action.statut);

      if (available === -1) {
        // Statut n'est pas dans le store        
        return {
          ...state,          
          listOfStatuts: [newStatut, ...state.listOfStatuts]
        };
      } else {
        return {
          ...state
        };
      }
    default:
      return state;
  }
}
