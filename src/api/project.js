import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest
} from "../utils/utilsHttp";
import { BACKEND_API } from "../global/environment";

const url = `${BACKEND_API}projects`;

export function getProjectsAPI(data) {
  const options = {
    /* headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${data.token}`
    } */
  };
  return getRequest(`${url}?Skip=${data.skip_rows}&Max=${data.max_rows}&search=${data.search}`, options);
}

export function getProjectAPI(authorization) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authorization}`
    }    
  };
  return getRequest(`${url}`, options);
}

export function postProjectAPI(payload, authorization) {
  const options = {
    url: url,
    method: 'post',
    /* headers: {
      "Content-Type": "application/json",
      Authorization: `${authorization}`
    }, */
    data: {...payload}
  };

  return postRequest(options);
}

export function putProjectAPI(projectId, payload, authorization) {
  const options = {
    url: `${url}/${projectId}`,
    method: 'put',
    /* headers: {
      "Content-Type": "application/json",
      Authorization: `${authorization}`
    }, */
    data: {...payload}
  };
  return putRequest(options);
}

export function patchProjectAPI(projectId, payload,authorization) {
  const options = {
    method: 'patch',
    url: `${url}/${projectId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authorization}`
    },
    data: {...payload}
  };
  return patchRequest(options);
}

export function deleteProjectAPI(projectId, authorization) {
  const options = {
    url: `${url}/${projectId}`,
    method: 'delete',
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authorization}`
    }
  };
  return deleteRequest(options);
}
