export const PARSE_BASE_URL = 'https://tiny-lasagna-server-new.herokuapp.com/api';
// export const PARSE_BASE_URL = 'https://tiny-lasagna-server.herokuapp.com';
export const PARSE_HEADERS = {
  "X-Parse-Application-Id": "tiygvl",
  "X-Parse-REST-API-Key": "slumber"
}

// parseClass is the class you want to associate the record with (e.g. _User if you want to point the record to a specific user)
// objectId is the specific record in the parseClass you want to associate the record with
export const setPointer = (parseClass, objectId) => {

  let pointerObject = {
    '__type': 'Pointer',
    'className': parseClass,
    'objectId': objectId
  };

  return pointerObject;
}

// e.g. parseURL('chef', _User, objectId)
export const parseWhere = (field, parseClass, objectId) => {
  let object = {};

  object[field] = {
    '__type': 'Pointer',
    'field': field,
    'className': parseClass,
    'objectId': objectId,
  }

  let whereClause = `?where=${JSON.stringify(object)}`
  console.log('where', whereClause);
  return whereClause;
}

export const fileUpload = (file, callback) => {
    fetch(`${PARSE_BASE_URL}/files/${file.name}`, {
      method: 'POST',
      body: file,
      headers: PARSE_HEADERS
    })
    .then((response)=>{
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((result)=>{
      callback(result);
      return;
    })
    .catch((err)=>{
      console.log(err);
      return;
    })
}

export const saveProfile = (profile) => {
  fetch(`${PARSE_BASE_URL}/classes/Profile`, {
    method: "POST",
    body: JSON.stringify(profile),
    headers: PARSE_HEADERS
  })
  .then((response)=>{
    if(!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((result)=>{
    console.log('profile added', result)
    return;
  })
  .catch(err => {
    console.log(err)
  });
}
