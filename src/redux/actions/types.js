export const ProjectsActions = {
  ADD_PROJECT: "@projects/add_project",  
  UPDATE_PROJECT: "@projects/update_project",
  LISTER_PROJECTS: "@projects/lister_projets",  
  REMOVE_ALL_PROJECTS: "@projects/remove_all",
  DEFINE_NUM_PROJECTS: "@projects/define_num_projects"
};

export const MessagesActions = {
  PENDING_ADD: "@message/pending_add",
  SUCCESS_ADD: "@message/success_add",
  FAILED_ADD: "@message/failed_add",
  RESET_MESSAGE_STORE: "@message/reset_message_store"
};

export const AdministratorsActions = {
  SET_ADMIN_PROFILE: "@admin/set_admin_profile",
  SET_ADMIN_SECURITY: "@admin/set_admin_security",
  UNSET_ADMIN: "@admin/unset_admin",
  SET_ADMIN_DETAILS: "@admin/set_admin_details",
  UNSET_ADMIN_DETAILS: "@admin/unset_admin_details"
};

export const StatutsActions = {
  ADD_STATUT: "@statut/add_statut"
}

export const ProjectActions = {
  SET_PROJECT_DETAILS:"@project/set_project_details"
}

export const MembersActions = {
  ADD_MEMBER: "@members/add_member",  
  UPDATE_MEMBER: "@members/update_member",  
  REMOVE_ALL_MEMBERS: "@members/remove_all",
  DEFINE_NUM_MEMBERS: "@members/define_num_members",
  LISTER_MEMBERS: "@projects/lister_members",  
};

