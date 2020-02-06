
import { connect } from "react-redux";
import { setProjectDetails, updateProject, addStatut } from "../../redux/actions";
import VueGlobaleStatic from "./VueGlobaleStatic";
import { MessagesActions } from "../../redux/actions/types";
import { getProjectAPI, putProjectAPI, patchProjectAPI } from "../../api/project";
import { getStatutsAPI } from "../../api/statut";
import { getMembersOfProjectAPI } from "../../api/member";


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
        message: ""
      });
      
      const project = await getProjectAPI(data.idProject, token);
      
      dispatch(setProjectDetails(project));      

      return dispatch({
        type: MessagesActions.SUCCESS_ADD,
        message: ""
      });
    } catch (err) {
      
      dispatch({
        type: MessagesActions.FAILED_ADD,
        message:
          (err.response && err.response.data) ||
          "Une erreur inattendue est survenue"
      });
      throw new Error();  
    }
  },
  getStatuts: async (token) => {
    try{      
      const result = await getStatutsAPI(token);
      
      if(result && result.data){
        result.data.map(statut => {
          
          dispatch(addStatut(statut));
        })
      }
      return;
    }catch(err){
      dispatch({
        type: MessagesActions.FAILED_ADD,
        message:
          (err.response && err.response.data) ||
          "Une erreur inattendue est survenue"
      });
      throw new Error();      
    }
  },
  getMembers: async (projectId, token) => {
    try{      
      const result = await getMembersOfProjectAPI(projectId, {skip_rows: 0, max_rows: 3}, token);
        
      return result.data;
    }catch(err){
      dispatch({
        type: MessagesActions.FAILED_ADD,
        message:
          (err.response && err.response.data) ||
          "Une erreur inattendue est survenue"
      });
      return [];
    }
  },
  update: d => dispatch(updateProject(d))
});

export default connect(mapStateToProps, mapDispatchToProps)(VueGlobaleStatic);
