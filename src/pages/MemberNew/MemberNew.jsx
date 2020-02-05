import { connect } from "react-redux";
import MemberNewStatic from "./MemberNewStatic";



const mapStateToProps = state => {
  //  State Messages
  const sm = state.message,
    su = state.profile, ss = state.statut;

  return {
    message: sm.message,
    status: sm.status,    
  };
};

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberNewStatic);
