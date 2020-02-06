import { connect } from "react-redux";
import { listerProjects } from "../../redux/actions";
import ProjectListStatic from "./ProjectListStatic";
import { MessagesActions } from "../../redux/actions/types";
import { getProjectsAPI, deleteProjectAPI } from "../../api/project";
import { defineNumProjects } from "../../redux/actions/projects";

const mapStateToProps = state => {
  //  State Messages
  const sm = state.message,
    //  State Project
    sp = state.projectList, su = state.profile;

  return {
    message: sm.message,
    status: sm.status,
    rows: sp.listOfProjects,
    totalItems: sp.numProjects,
    token: su.keycloak.token
  };
};

const mapDispatchToProps = dispatch => ({

  onEvent: async (data,token) => {
    try {
      
      dispatch({
        type: MessagesActions.PENDING_ADD,
        message: ""
      });

      const result = await getProjectsAPI(data, token);
      dispatch(defineNumProjects(result.total));
      
      if (data.skip_rows < -1) {        
      } else {
        dispatch(listerProjects(result.data));
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
  
  delete: async (payload, token) => {
    try {
      dispatch({
        type: MessagesActions.PENDING_ADD,
        message: ""
      });
      
      //  Création du projet
      await deleteProjectAPI(payload, token);       

      return dispatch({
        type: MessagesActions.SUCCESS_ADD,
        message: "Projet Supprimé avec succès"
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListStatic);
