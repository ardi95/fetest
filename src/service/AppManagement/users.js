import { api } from "../api";

const basePath = '/app-management/user'

export async function getRole(params) {
  return api({
    url: `${basePath}/get-role`,
    method: 'GET',
    params
  });
}

export async function list(params) {
  return api({
    url: `${basePath}`,
    method: 'GET',
    params
  });
}