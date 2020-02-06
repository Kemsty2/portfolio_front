import { connect } from "react-redux";
import {
  addProject,
  updateProject,
  addStatut,
  setProjectDetails
} from "../../redux/actions";
import ProjectNewStatic from "./ProjectNewStatic";
import { MessagesActions } from "../../redux/actions/types";
import { postProjectAPI, getProjectAPI, putProjectAPI } from "../../api/project";
import { getStatutsAPI } from "../../api/statut";

const mapStateToProps = state => {
  //  State Messages
  const sm = state.message,
    su = state.profile,
    ss = state.statut,
    sp = state.project;

  return {
    message: sm.message,
    status: sm.status,
    listOfStatuts: ss.listOfStatuts,
    listOfClients: [
      { label: "Interne", options: [] },
      { label: "Externe", options: [] }
    ],
    project: sp.project,
    token: su.keycloak.token
  };
};

const mapDispatchToProps = dispatch => ({
  create: async (payload, token) => {
    try {
      dispatch({
        type: MessagesActions.PENDING_ADD,
        message: ""
      });
      
      //  Création du projet
      const project = await postProjectAPI(payload, token);
      
      dispatch(addProject(project));
      

      return dispatch({
        type: MessagesActions.SUCCESS_ADD,
        message: "Projet Ajouté avec succès"
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

  getProject: async (projectId, token) => {
    try {
      dispatch({
        type: MessagesActions.PENDING_ADD,
        message: ""
      });

      
      //  Création du projet
      const project = await getProjectAPI(projectId, token);

      //  Création du membre Chef Projet
      //  await postMembersAPI(payload, token)
      dispatch(setProjectDetails(project));    

      return dispatch({
        type: MessagesActions.SUCCESS_ADD,
        message: ""
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

  getStatuts: async token => {
    try {
      const result = await getStatutsAPI(token);
      
      if (result && result.data) {
        result.data.map(statut => {          
          dispatch(addStatut(statut));
        });
      }
      return;
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
      
      //  Création du projet
      const project = await putProjectAPI(payload.id, payload, token);

      //  Création du membre Chef Projet
      //  await postMembersAPI(payload, token)
      dispatch(updateProject(project));
      dispatch(setProjectDetails({}));
      

      return dispatch({
        type: MessagesActions.SUCCESS_ADD,
        message: "Projet Modifié avec succès"
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNewStatic);
