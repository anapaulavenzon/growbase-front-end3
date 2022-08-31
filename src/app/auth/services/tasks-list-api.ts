/* eslint-disable camelcase */
import { datum, note } from 'app/main/notes/store/types';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-tasks-list.herokuapp.com',
});

async function buscarNotesApi(url: string, token: string): Promise<note[]> {
  try {
    const response = await api.get(url, { params: { token } });

    return response.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function criarNoteApi(url: string, data: datum): Promise<note | null> {
  try {
    const response = await api.post(url, data);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function excluirNoteApi(url: string, id: string, token: string): Promise<boolean> {
  try {
    const response = await api.delete(`${url}/${id}?token=${token}`);
    return response.data.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function atualizarNoteApi(url: string, data: datum): Promise<boolean> {
  try {
    const response = await api.put(url, data);
    return response.data.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { buscarNotesApi, criarNoteApi, atualizarNoteApi, excluirNoteApi };
