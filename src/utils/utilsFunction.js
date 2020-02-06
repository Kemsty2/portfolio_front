export function isEmpty(obj) {
    let result = false;
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      result = true;
    }
    return result;
  }