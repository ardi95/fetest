import { api } from "./api";

const basePath = '/product'

export async function index(params) {
  return api({
    url: `${basePath}`,
    method: 'GET',
    params
  });
}