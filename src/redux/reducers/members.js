import { MembersActions } from "../actions/types";
import lodash from "lodash";
const initialState = {
  listOfMembers: [],    
  numMembers: 0
};

export function membersReducer(state = initialState, action) {
  const oldState = lodash.cloneDeep(state);
  const newMember = action.member;  
  let available = 0;
  let listOfMembers;

  switch (action.type) {
    case MembersActions.ADD_MEMBER:
      newMember.id = action.member.id;
      available = lodash.findIndex(oldState.listOfMembers, action.member);

      if (available === -1) {
        // Projet n'est pas dans le store
        return {
          ...state,          
          listOfMembers: [newMember, ...state.listOfMembers]
        };
      } else {
        return {
          ...state
        };
      }

    case MembersActions.UPDATE_MEMBER:
        console.log("listOfMember",listOfMembers);        
      listOfMembers = state.listOfMembers.map(member => {
        console.log("member", member);
        console.log("action_member", action.member)
        if (member.id === action.member.id) {        
          return Object.assign({}, member, action.member);
        }
        return member;
      });
      return Object.assign({}, state, { listOfMembers: [...listOfMembers] });

    case MembersActions.DEFINE_NUM_MEMBERS:
      return Object.assign({}, state, { numMembers: action.numMembers });

    case MembersActions.REMOVE_ALL_MEMBERS:
      return Object.assign({}, state, { listOfMembers: [] });

    case MembersActions.LISTER_MEMBERS:
      return Object.assign({}, state, {
        listOfMembers: action.listOfMembers
      });

    default:
      return state;
  }
}
