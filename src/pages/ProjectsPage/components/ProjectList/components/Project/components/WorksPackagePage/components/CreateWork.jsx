import React from "react";
import {useQuery} from '../../../../../../../../../utils/utilsRouter';
class CreateWork extends React.Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let query = useQuery('type');

    console.log(query);
  }
  
  render() {
    return <div className="content"></div>;
  }
}

export default CreateWork;
