import Home from "../pages/HomePage/components/Home";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectList from "../pages/ProjectsPage/components/ProjectList/ProjectList";
import RoadMapPage from "../pages/ProjectsPage/components/ProjectList/components/Project/components/RoadmapPage";
import WorksPackagePage from "../pages/ProjectsPage/components/ProjectList/components/Project/components/WorksPackagePage/WorksPackagePage";
import MembersPage from "../pages/ProjectsPage/components/ProjectList/components/Project/components/MembersPage/MembersPage";
import Project from "../pages/ProjectsPage/components/ProjectList/components/Project";
import ProjectNew from "../pages/ProjectsPage/components/ProjectList/components/ProjectNew";
import WorkPackageList from "../pages/ProjectsPage/components/ProjectList/components/Project/components/WorksPackagePage/components/WorkPackageList";
import CreateWork from "../pages/ProjectsPage/components/ProjectList/components/Project/components/WorksPackagePage/components/CreateWork";
import Work from "../pages/ProjectsPage/components/ProjectList/components/Project/components/WorksPackagePage/components/Work";
import MembersList from "../pages/ProjectsPage/components/ProjectList/components/Project/components/MembersPage/components/MemberList";
import Member from "../pages/ProjectsPage/components/ProjectList/components/Project/components/MembersPage/components/Member";

export const routesSidebar = [
  { path: "/", icon: "test", name: "Accueil", layout: "" },
  { path: "/projects/", icon: "test", name: "liste Projets", layout: "" },
  {
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
  }
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
    component: ProjectsPage,
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
        component: Project,
        exact: true
      },
      {
        path: "/projects/:idProject/roadmap",
        name: "Feuille de route",
        component: RoadMapPage,
        layout: "/projects",
        exact: true
      },
      {
        path: "/projects/:idProject/workpackages",
        name: "Lots de Travaux",
        component: WorksPackagePage,
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
            component: CreateWork,
            layout: "/projects",
            exact: true
          },
          {
            path: "/projects/:idProject/workpackages/:idwork/activity",
            name: "Lots de Travaux",
            component: Work,
            layout: "/projects",
            exact: true
          },
          {
            path: "/projects/:idProject/workpackages/report",
            name: "Lots de Travaux",
            component: WorkPackageList,
            layout: "/projects",
            exact: true
          }
        ]
      },
      {
        path: "/projects/:idProject/members",
        name: "Membres",
        component: MembersPage,
        layout: "/projects",        
        routes: [
          {
            path: "/projects/:idProject/members/",
            name: "Lots de Travaux",
            component: MembersList,
            layout: "/projects",
            exact: true
          },
          {
            path: "/projects/:idProject/members/:idmembers",
            name: "Lots de Travaux",
            component: Member,
            layout: "/projects",
            exact: true
          },    
        ]
      }
    ]
  }
];
