import { api } from './api'

const basePath = '/order'

export async function add(data) {
  return api({
    url: `${basePath}`,
    method: 'POST',
    data
  });
}
