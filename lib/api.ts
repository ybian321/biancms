import axios from 'axios';

async function baseAPI() {
  const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
  });
}

export async function resLogin() {
  return;
}

export async function resLogout() {
  return;
}

export async function resStudentList() {
  return;
}
