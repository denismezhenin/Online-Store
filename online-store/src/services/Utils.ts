 interface Irequest {
  resource: null | string;
  id: null | string;
  verb: null | string;
}
const Utils = {
  // --------------------------------
  //  Parse a url and break it into resource, id and verb
  // --------------------------------
  parseRequestURL: () => {
    let url = location.hash.slice(1).toLowerCase() || "/";
    let r = url.split("/");
    let request: Irequest = {
      resource: null,
      id: null,
      verb: null,
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
  },

  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  sleep: (ms:any) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default Utils;
