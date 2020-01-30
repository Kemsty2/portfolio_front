import Home from "../pages/HomePage/components/Home";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectList from "../pages/ProjectsPage/components/ProjectList/ProjectList";
import RoadMapPage from "../pages/ProjectsPage/components/ProjectList/components/Project/components/RoadmapPage";
import WorksPackagePage from "../pages/ProjectsPage/components/ProjectList/components/Project/components/WorksPackagePage";
import MembersPage from "../pages/ProjectsPage/components/ProjectList/components/Project/components/MembersPage";
import Project from "../pages/ProjectsPage/components/ProjectList/components/Project";
import ProjectNew from "../pages/ProjectsPage/components/ProjectList/components/ProjectNew";

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
    path: "/1/workpackage",
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
    exact: true,
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
        exact: true,
      },
      {
        path: "/projects/new",
        name: "Liste Projets",
        layout: "/projects",
        component: ProjectNew,
        exact: true,
      },
      {
        path: "/projects/:idProject",
        name: "Vue Globale",
        layout: "/projects",
        component: Project,
        exact: true,
      },
      {
        path: "/projects/:idProject/roadmap",
        name: "Feuille de route",        
        component: RoadMapPage,
        layout: "/projects",
        exact: true
      },
      {
        path: "/projects/:idProject/workspackage",
        name: "Lots de Travaux",        
        component: WorksPackagePage,
        layout: "/projects",
        exact: true
      },
      {
        path: "/projects/:idProject/members",
        name: "Membres",        
        component: MembersPage,
        layout: "/projects",
        exact: true
      }
    ]
  }
];
