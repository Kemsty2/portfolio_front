import { connect } from "react-redux";
import { addProject, updateProject } from "../../redux/actions";
import ProjectNewStatic from "./ProjectNewStatic";
import { MessagesActions } from "../../redux/actions/types";
import { postProjectAPI } from "../../api/project";

const mapStateToProps = state => {
  //  State Messages
  const sm = state.message,
    su = state.profile;

  return {
    message: sm.message,
    status: sm.status,
    user: su.admin
  };
};

const mapDispatchToProps = dispatch => ({
  create: async (payload, token) => {
    try {
      dispatch({
        type: MessagesActions.PENDING_ADD,
        message: "Action en cours"
      });

      console.log("payload", payload);
      const project = await postProjectAPI(payload, token);
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
  update: d => dispatch(updateProject(d))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNewStatic);
