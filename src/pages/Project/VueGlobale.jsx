
import { connect } from "react-redux";
import { setProjectDetails, updateProject, addStatut } from "../../redux/actions";
import VueGlobaleStatic from "./VueGlobaleStatic";
import { MessagesActions } from "../../redux/actions/types";
import { getProjectAPI, putProjectAPI, patchProjectAPI } from "../../api/project";
import { getStatutsAPI } from "../../api/statut";
import { getMembersAPI } from "../../api/member";


const mapStateToProps = state => {
  //  State Messages
  const sm = state.message,
    su = state.profile, ss = state.statut,
    spd = state.project;

  return {
    message: sm.message,
    status: sm.status,
    project: spd.project,   
    token: su.keycloak.token     
  };
};

const mapDispatchToProps = dispatch => ({
  init: async (data, token) => {
    try {
      dispatch({
        type: MessagesActions.PENDING_ADD,
        message: "Action en cours"
      });
      
      const project = await getProjectAPI(data.idProject, token);
      console.log("project", project);
      dispatch(setProjectDetails(project));      

      return dispatch({
        type: MessagesActions.SUCCESS_ADD,
        message: "Projet Chargé avec succès"
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: MessagesActions.FAILED_ADD,
        message:
          (err.response && err.response.data) ||
          "Une erreur inattendue est survenue"
      });
    }
  },
  getStatuts: async (token) => {
    try{      
      const result = await getStatutsAPI(token);
      console.log("statut",result);
      if(result && result.data){
        result.data.map(statut => {
          console.log("statut", statut)
          dispatch(addStatut(statut));
        })
      }
      return;
    }catch(err){
      return dispatch({
        type: MessagesActions.FAILED_ADD,
        message:
          (err.response && err.response.data) ||
          "Une erreur inattendue est survenue"
      });
    }
  },
  getMembers: async (data, token) => {
    try{      
      const result = await getMembersAPI(token);
      console.log("statut",result);
      if(result && result.data){
        result.data.map(member => {
          console.log("member", member)
          dispatch(addStatut(member));
        })
      }
      return;
    }catch(err){
      return dispatch({
        type: MessagesActions.FAILED_ADD,
        message:
          (err.response && err.response.data) ||
          "Une erreur inattendue est survenue"
      });
    }
  },
  update: d => dispatch(updateProject(d))
});

export default connect(mapStateToProps, mapDispatchToProps)(VueGlobaleStatic);
