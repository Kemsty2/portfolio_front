import React from "react";
import {useQuery} from '../../../../../../../../../utils/utilsRouter';
class WorkNew extends React.Component {  

  componentDidMount(){
    let query = useQuery('type');

    console.log(query);
  }
  
  render() {
    return <div className="content"></div>;
  }
}

export default WorkNew;
