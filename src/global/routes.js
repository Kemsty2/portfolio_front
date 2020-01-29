import Home from "../pages/HomePage/components/Home";

export const routesSidebar = [
  { path: "/home", icon: "test", name: "Accueil", layout: "" },
  { path: "/projects/", icon: "test", name: "Vue Globale", layout: "" },
  { path: "/:idProject/", icon: "test", name: "Vue Globale", layout: "/projects" },
  {
    path: "/:idProject/roadmap",
    icon: "test",
    name: "Feuille de route",
    layout: "/projects"
  },
  {
    path: "/:idProject/workpackage",
    icon: "test",
    name: "Lots de Travaux",
    layout: "/projects"
  },
  { path: "/:idProject/members", icon: "test", name: "Membres", layout: "/projects" }
];

export const routes = [
  {
    path: "/home",    
    name: "Accueil",
    layout: "",
    component: Home
  },
  {
    path: "/projects",    
    name: "Liste Projets",
    layout: "",
    component: Home
  },
  {
    path: "/:idProject",    
    name: "Vue Globale",
    layout: "/projects",
    component: Home
  },
  {
    path: "/:idProject/roadmap",    
    name: "Feuille de route",
    layout: "/projects",
    component: Home
  },
  {
    path: "/test/workpackage",    
    name: "Lots de Travaux",
    layout: "/projects",
    component: Home
  },
  {
    path: "/projects/test/members",    
    name: "Membres",
    layout: "/projects",
    component: Home
  }
];
