import { StatutsActions } from "./types";

export function addStatut(statut){
    return {
      type: StatutsActions.ADD_STATUT,
      statut: {...statut}
    }
  }