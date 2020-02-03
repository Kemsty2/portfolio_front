import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest
} from "../utils/utilsHttp";
import { BACKEND_API } from "../global/environment";

const url = `${BACKEND_API}projet`;
const auth = btoa('WDTN4590:Naruto1997');

export function getProjectsAPI(data, token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`
    }
  };
  return getRequest(`${url}?Skip=${data.skip_rows}&Max=${data.max_rows}&search=${data.search}&StartDate=01/02/2020&EndDate=03/02/2020`, options);
}

export function getProjectAPI(projectId, token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`
    }    
  };
  return getRequest(`${url}/${projectId}`, options);
}

export function postProjectAPI(payload, token) {
  const options = {
    url: url,
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`
    },
    data: {...payload}
  };

  return postRequest(options);
}

export function putProjectAPI(projectId, payload, token) {
  const options = {
    url: `${url}/${projectId}`,
    method: 'put',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`
    },
    data: {...payload}
  };
  return putRequest(options);
}

export function patchProjectAPI(projectId, payload,token) {
  const options = {
    method: 'patch',
    url: `${url}/${projectId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`
    },
    data: {...payload}
  };
  return patchRequest(options);
}

export function deleteProjectAPI(projectId, token) {
  const options = {
    url: `${url}/${projectId}`,
    method: 'delete',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`
    }
  };
  return deleteRequest(options);
}
