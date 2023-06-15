import { api } from "./api";

export async function login(data) {
  console.log('tes login');
  return api({
    url: `/login`,
    method: "POST",
    data,
  });
}

export function profile() {
  return api({
    url: `/detail-user`,
  });
}

export function logout() {
  return api({
    url: `/logout`,
    method: "POST",
  });
}
