import axios from "axios";

function handleHttpError(error) {
  const genericErrorMessage = "Something Failde. Try againg?";

  if (error.response && error.response.data) {
    return error.response.data.error || genericErrorMessage;
  }

  return genericErrorMessage;
}

function makeHttpRequest(apiCall) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await apiCall();
      resolve(data.data);
    } catch (e) {
      reject(handleHttpError(e));
    }
  });
}

export function getRequest(path, options={}){
  return makeHttpRequest(() => axios.get(path, options));
}

export function postRequest(options={method: 'post'}){
  return makeHttpRequest(() => axios(options));
}

export function putRequest(options={method: 'put'}){
  return makeHttpRequest(() => axios(options));
}

export function patchRequest(options={method: 'patch'}){
  return makeHttpRequest(() => axios(options));
}

export function deleteRequest(options={method: 'delete'}){
  return makeHttpRequest(() => axios(options));
}

