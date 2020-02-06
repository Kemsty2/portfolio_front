import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest
} from "../utils/utilsHttp";
import { BACKEND_API } from "../global/environment";

const url = `${BACKEND_API}membre`;

export function getMembersAPI(data, token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return getRequest(`${BACKEND_API}/membres?Skip=${data.skip_rows}&Max=${data.max_rows}&search=${data.search}`, options);
}

export function getMembersOfProjectAPI(projetId, data, token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return getRequest(`${BACKEND_API}projet/${projetId}/membres?Skip=${data.skip_rows}&Max=${data.max_rows}&search=${data.search}`, options);
}

export function getMemberAPI(memberId, token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }    
  };
  return getRequest(`${url}/${memberId}`, options);
}

export function postMemberAPI(payload, token) {
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

export function putMemberAPI(memberId, payload, token) {
  const options = {
    url: `${url}/${memberId}`,
    method: 'put',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    data: {...payload}
  };
  return putRequest(options);
}

export function patchMemberAPI(memberId, payload,token) {
  const options = {
    method: 'patch',
    url: `${url}/${memberId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    data: {...payload}
  };
  return patchRequest(options);
}

export function deleteMemberAPI(memberId, token) {
  const options = {
    url: `${url}/${memberId}`,
    method: 'delete',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return deleteRequest(options);
}
