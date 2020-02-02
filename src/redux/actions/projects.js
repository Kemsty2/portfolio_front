import { ProjectsActions, MessagesActions } from "./types";

/* const mockProjects = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    objet: "test",
    type: "",
    perimetre: "",
    objectifs: "",
    clientType: "",
    beneficeClient: "",
    createdBy: "",
    updatedBy: "",
    createdAt: new Date().toUTCString(),
    updateAt:  new Date().toUTCString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    objet: "test",
    type: "",
    perimetre: "",
    objectifs: "",
    clientType: "",
    beneficeClient: "",
    createdBy: "",
    updatedBy: "",
    createdAt: new Date().toUTCString(),
    updateAt:  new Date().toUTCString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    objet: "test",
    type: "",
    perimetre: "",
    objectifs: "",
    clientType: "",
    beneficeClient: "",
    createdBy: "",
    updatedBy: "",
    createdAt: new Date().toUTCString(),
    updateAt:  new Date().toUTCString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    objet: "test",
    type: "",
    perimetre: "",
    objectifs: "",
    clientType: "",
    beneficeClient: "",
    createdBy: "",
    updatedBy: "",
    createdAt: new Date().toUTCString(),
    updateAt:  new Date().toUTCString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000005",
    objet: "test",
    type: "",
    perimetre: "",
    objectifs: "",
    clientType: "",
    beneficeClient: "",
    createdBy: "",
    updatedBy: "",
    createdAt: new Date().toUTCString(),
    updateAt:  new Date().toUTCString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000006",
    objet: "test",
    type: "",
    perimetre: "",
    objectifs: "",
    clientType: "",
    beneficeClient: "",
    createdBy: "",
    updatedBy: "",
    createdAt: new Date().toUTCString(),
    updateAt:  new Date().toUTCString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000007",
    objet: "test",
    type: "",
    perimetre: "",
    objectifs: "",
    clientType: "",
    beneficeClient: "",
    createdBy: "",
    updatedBy: "",
    createdAt: new Date().toUTCString(),
    updateAt:  new Date().toUTCString(),
  }  
]; */

export function addProject(data) {
  return (dispatch, getState) => {
    const client = getState().profile.client;
    console.log('data', data);
    dispatch({ type: MessagesActions.PENDING_ADD, message: "Action en cours" });
    return client
      .post("/api/Projet", data)
      .then(response => {
        dispatch({
          type: ProjectsActions.ADD_PROJECT,
          project: response.data
        });

        return dispatch({
          type: MessagesActions.SUCCESS_ADD,
          message: "Projet enregistré avec succès"
        });
      })
      .catch(err => {
        return dispatch({
          type: MessagesActions.FAILED_ADD,
          message:
            (err.response && err.response.data) ||
            "La création du projet a échouée"
        });
      });      
  };
}

export function listerProjets(data) {
  return (dispatch, getState) => {
    console.log(getState().profile.client.defaults);
    const client = getState().profile.client;    
    dispatch({ type: MessagesActions.PENDING_ADD, message: "Action en cours" });        
    return client
      .get(
        `/api/Projet?Skip=${data.skip_rows}&Max=${data.max_rows}&Search=${data.search}`
      )
      .then(response => {
        console.log("data", data);
        console.log("response", response.data);
        if (data.skip_rows < -1) {
          let rows = [];

          for (let k = 0; k < response.data.length; k++) {
            const element = response.data[k];

            if (k == 0) {
              rows.push(Object.keys(element));
            }

            rows.push(Object.values(element));
          }
          let csvContent = rows.map(e => e.join(";")).join("\n"),
            blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

          //saveAs(blob, "export_" + new Date() + ".csv"); 
        } else {
          dispatch({
            type: ProjectsActions.LISTER_PROJECTS,
            listOfProjects: response.data.data,
            numProjects: response.data.total
          });
        }

        return dispatch({ type: MessagesActions.SUCCESS_ADD, message: "" });
      })
      .catch(err => {
        return dispatch({
          type: MessagesActions.FAILED_ADD,
          message:
            (err.response && err.response.data) ||
            "Une erreur inattendue est survenue"
        });
      });
  };
}

export function updateProject(project) {
  return {
    type: ProjectsActions.UPDATE_PROJECT,
    project: { ...project }
  };
}
