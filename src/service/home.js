import { api } from "./api";

export async function home(method = 'GET', params = null, data = null, id = '') {
  return api({
    url: `/home${id}`,
    method,
    params,
    data
  });
}
