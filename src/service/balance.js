import { api } from "./api";

const basePath = '/balance'

export async function index(params) {
  return api({
    url: `${basePath}`,
    method: 'GET',
    params
  });
}

export async function add(data) {
  return api({
    url: `${basePath}/add`,
    method: 'POST',
    data
  });
}