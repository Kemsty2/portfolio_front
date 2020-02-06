import { MembersActions } from "./types";

export function listerMembers(listOfMembers){
  return {
    type: MembersActions.LISTER_MEMBERS,    
    listOfMembers: [...listOfMembers]
  }
}

export function updateMember(member) {
  return {
    type: MembersActions.UPDATE_MEMBER,
    member: { ...member }
  };
}

export function addMember(member){
  return {
    type: MembersActions.ADD_MEMBER,
    member: {...member}
  }
}

export function defineNumMembers(numMembers){
  return {
    type: MembersActions.DEFINE_NUM_MEMBERS,
    numMembers: numMembers
  }
}

export function removeAllMembers(){
  return {
    type: MembersActions.REMOVE_ALL_MEMBERS
  }
}
