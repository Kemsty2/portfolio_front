import { connect } from "react-redux";
import { addProject, updateProject, addStatut } from "../../redux/actions";
import ProjectNewStatic from "./ProjectNewStatic";
import { MessagesActions } from "../../redux/actions/types";
import { postProjectAPI } from "../../api/project";
import { getStatutsAPI } from "../../api/statut";


const mapStateToProps = state => {
  //  State Messages
  const sm = state.message,
    su = state.profile, ss = state.statut;

  return {
    message: sm.message,
    status: sm.status,
    listOfStatuts: ss.listOfStatuts,
    listOfClients: [{label: 'Interne', options: []}, {label: 'Externe', options: []}],
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

      console.log("payload", payload);
      //  Création du projet
      const project = await postProjectAPI(payload, token);

      //  Création du membre Chef Projet
      //  await postMembersAPI(payload, token)
      dispatch(addProject(project));

      console.log("project", project);

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
  update: d => dispatch(updateProject(d))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNewStatic);
