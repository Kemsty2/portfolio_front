import MemberListStatic from "./MemberListStatic";
import { MessagesActions } from "../../redux/actions/types";
import { connect } from "react-redux";
import { getMembersAPI, postMemberAPI, putMemberAPI, deleteMemberAPI } from "../../api/member";
import {
  defineNumMembers,
  listerMembers,
  addMember,
  updateMember
} from "../../redux/actions";

const mapStateToProps = state => {
  const sm = state.message,
    smb = state.memberList,
    su = state.profile;

  return {
    message: sm.message,
    status: sm.status,
    rows: smb.listOfMembers,
    totalItems: smb.numMembers,
    /* members: smb.listOfMembers, */
    token: su.keycloak.token
  };
};

const mapDispatchToProps = dispatch => ({
  onEvent: async (data, token) => {
    try {
      console.log("data", data);
      dispatch({
        type: MessagesActions.PENDING_ADD,
        message: ""
      });

      const result = await getMembersAPI(data, token);
      dispatch(defineNumMembers(result.total));

      console.log("listOfMembers", result);
      if (data.skip_rows < -1) {
      } else {
        dispatch(listerMembers(result.data));
      }
      return dispatch({ type: MessagesActions.SUCCESS_ADD, message: "" });
    } catch (err) {
      return dispatch({
        type: MessagesActions.FAILED_ADD,
        message:
          (err.response && err.response.data) ||
          "Une erreur inattendue est survenue"
      });
    }
  },
  create: async (payload, token) => {
    try {
      dispatch({
        type: MessagesActions.PENDING_ADD,
        message: ""
      });

      console.log("payload", payload);
      //  Création du projet
      const member = await postMemberAPI(payload, token);

      //  Création du membre Chef Projet
      //  await postMembersAPI(payload, token)
      dispatch(addMember(member));

      console.log("member", member);

      return dispatch({
        type: MessagesActions.SUCCESS_ADD,
        message: "Membre Ajouté avec succès"
      });
    } catch (err) {
      return dispatch({
        type: MessagesActions.FAILED_ADD,
        message:
          (err.response && err.response.data) ||
          "Une erreur inattendue est survenue"
      });
    }
  },
  update: async (payload, token) => {
    try {
      dispatch({
        type: MessagesActions.PENDING_ADD,
        message: ""
      });

      console.log("payload", payload);
      //  Création du projet
      const member = await putMemberAPI(payload.id, payload, token);

      //  Création du membre Chef Projet
      //  await postMembersAPI(payload, token)
      dispatch(updateMember(member));

      console.log("member", member);

      return dispatch({
        type: MessagesActions.SUCCESS_ADD,
        message: "Membre Modifié avec succès"
      });
    } catch (err) {
      return dispatch({
        type: MessagesActions.FAILED_ADD,
        message:
          (err.response && err.response.data) ||
          "Une erreur inattendue est survenue"
      });
    }
  },
  delete: async (payload, token) => {    
    try {
      dispatch({
        type: MessagesActions.PENDING_ADD,
        message: ""
      });

      console.log("payload", payload);
      //  Création du projet
      await deleteMemberAPI(payload, token);

      //  Création du membre Chef Projet
      //  await postMembersAPI(payload, token)
      //dispatch(addProject(project));      

      return dispatch({
        type: MessagesActions.SUCCESS_ADD,
        message: "Membre Supprimé avec succès"
      });
    } catch (err) {
      return dispatch({
        type: MessagesActions.FAILED_ADD,
        message:
          (err.response && err.response.data) ||
          "Une erreur inattendue est survenue"
      });
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberListStatic);
