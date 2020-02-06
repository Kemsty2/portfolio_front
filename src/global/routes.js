import Home from "../pages/Home/Home";
import ProjectsContainer from "../containers/Projects/ProjectContainer";
import ProjectList from "../pages/ProjectList/ProjectList";
import ProjectNew from "../pages/ProjectNew/ProjectNew";
import VueGlobale from "../pages/Project/VueGlobale";
import RoadMap from "../pages/Project/RoadMap";
import WorksPackageContainer from "../containers/WorksPackage/WorkPackageContainer";
import WorkPackageList from "../pages/WorkPackageList/WorkPackageList";
import WorkNew from "../pages/WorkNew/WorkNew";
import Work from "../pages/Work/Work";
import MembersContainer from "../containers/Members/MembersContainer";
import MembersList from "../pages/MemberList/MemberList";
import Member from "../pages/Member/Member";
import MemberNew from "../pages/MemberNew/MemberNew";

export const routesSidebar = [
  { path: "/", icon: "test", name: "Accueil", layout: "" },
  { path: "/projects/", icon: "test", name: "liste Projets", layout: "" },
  /* {
    path: "/1/",
    icon: "test",
    name: "Vue Globale",
    layout: "/projects"
  },
  {
    path: "/1/roadmap",
    icon: "test",
    name: "Feuille de route",
    layout: "/projects"
  },
  {
    path: "/1/workpackages",
    icon: "test",
    name: "Lots de Travaux",
    layout: "/projects"
  },
  {
    path: "/1/members",
    icon: "test",
    name: "Membres",
    layout: "/projects"
  } */
];

export const routes = [
  {
    path: "/",
    name: "Accueil",
    component: Home,
    exact: true
  },
  {
    path: "/projects",
    name: "Liste Projets",
    layout: "",
    component: ProjectsContainer,
    exact: false,
    routes: [
      {
        path: "/projects/",
        name: "Liste Projets",
        layout: "/projects",
        component: ProjectList,
        exact: true
      },
      {
        path: "/projects/new",
        name: "Liste Projets",
        layout: "/projects",
        component: ProjectNew,
        exact: true
      },
      {
        path: "/projects/:idProject",
        name: "Vue Globale",
        layout: "/projects",
        component: VueGlobale,
        exact: true
      },
      {
        path: "/projects/:idProject/roadmap",
        name: "Feuille de route",
        component: RoadMap,
        layout: "/projects",
        exact: true
      },
      {
        path: "/projects/:idProject/workpackages",
        name: "Lots de Travaux",
        component: WorksPackageContainer,
        layout: "/projects",
        routes: [
          {
            path: "/projects/:idProject/workpackages",
            name: "Lots de Travaux",
            component: WorkPackageList,
            layout: "/projects",
            exact: true
          },
          {
            path: "/projects/:idProject/workpackages/create_new",
            name: "Lots de Travaux",
            component: WorkNew,
            layout: "/projects",
            exact: true
          },
          {
            path: "/projects/:idProject/workpackages/:idwork/activity",
            name: "Lots de Travaux",
            component: Work,
            layout: "/projects",
            exact: true
          }
        ]
      },
      {
        path: "/projects/:idProject/members",
        name: "Membres",
        component: MembersContainer,
        layout: "/projects",        
        routes: [
          {
            path: "/projects/:idProject/members/",
            name: "Liste des Membres",
            component: MembersList,
            layout: "/projects",
            exact: true
          }, 
          {
            path: "/projects/:idProject/members/:idmembers",
            name: "Details Membre",
            component: Member,
            layout: "/projects",
            exact: true
          }   
        ]
      }
    ]
  }
];
