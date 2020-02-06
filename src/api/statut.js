import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    patchRequest
  } from "../utils/utilsHttp";
  import { BACKEND_API } from "../global/environment";
  
  const url = `${BACKEND_API}status`;  
  
  export function getStatutsAPI(token) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    return getRequest(`${url}?Skip=${0}&Max=${10000}&search=${""}&StartDate=01/02/2020&EndDate=03/02/2020`, options);
  }
  
  export function getStatutAPI(statutId, token) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }    
    };
    return getRequest(`${url}/${statutId}`, options);
  }
  
  export function postStatutAPI(payload, token) {
    const options = {
      url: url,
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      data: {...payload}
    };
  
    return postRequest(options);
  }
  
  export function putStatutAPI(statutId, payload, token) {
    const options = {
      url: `${url}/${statutId}`,
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      data: {...payload}
    };
    return putRequest(options);
  }
  
  export function patchStatutAPI(statutId, payload,token) {
    const options = {
      method: 'patch',
      url: `${url}/${statutId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      data: {...payload}
    };
    return patchRequest(options);
  }
  
  export function deleteStatutAPI(statutId, token) {
    const options = {
      url: `${url}/${statutId}`,
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    return deleteRequest(options);
  }
  