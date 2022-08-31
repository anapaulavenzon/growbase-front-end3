/* eslint-disable no-shadow */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  atualizarNoteApi,
  buscarNotesApi,
  criarNoteApi,
  excluirNoteApi,
} from '../../../auth/services/tasks-list-api';
import { note, datum } from './types';

interface buscaNotesParametro {
  url: string;
  token: string;
}

interface criaEditaNoteParametro {
  url: string;
  data: datum;
}

interface deletaNoteParametro {
  url: string;
  id: string;
  token: string;
}

export const buscarNotes = createAsyncThunk(
  'notes/buscarNotes',
  async (datum: buscaNotesParametro) => {
    const { url, token } = datum;
    const response = await buscarNotesApi(url, token)
      .then((notes: any) => {
        return notes;
      })
      .catch((erro: any) => {
        return erro;
      });
    return response;
  }
);

export const criarNote = createAsyncThunk(
  'notes/criarNote',
  async (datum: criaEditaNoteParametro) => {
    const { url, data } = datum;
    const response = await criarNoteApi(url, data)
      .then((note: any) => note)
      .catch((erro: any) => erro);
    return response;
  }
);

export const atualizarNote = createAsyncThunk(
  'notes/atualizarNotes',
  async (datum: criaEditaNoteParametro) => {
    const { url, data } = datum;
    const response = await atualizarNoteApi(url, data)
      .then((res: any) => (res ? 'Nota atualizada!' : 'Nota não atualizada'))
      .catch((erro: any) => 'Nota não atualizada');
    return response;
  }
);

export const excluirNote = createAsyncThunk(
  'notes/excluirNotes',
  async (datum: deletaNoteParametro) => {
    const { url, id, token } = datum;
    const response = await excluirNoteApi(url, id, token)
      .then((res: any) => (res ? 'Nota excluída!' : 'Não foi possivel excluir a nota!'))
      .catch((erro: any) => 'Não foi possivel excluir a nota!');
    return response;
  }
);

const adapter = createEntityAdapter<note>({
  selectId: (item) => item.id,
});

export const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.notes);

const NotesSlice = createSlice({
  name: 'notas',
  initialState: adapter.getInitialState({ loading: false }),
  reducers: {
    deletarNote: adapter.removeOne,
    updateNote: adapter.updateOne,
  },
  extraReducers(builder) {
    builder.addCase(buscarNotes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(buscarNotes.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload);
    });
    builder.addCase(criarNote.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(criarNote.fulfilled, (state, action) => {
      state.loading = false;
      adapter.addOne(state, action.payload);
    });
    builder.addCase(atualizarNote.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
    builder.addCase(excluirNote.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
  },
});

export const { deletarNote, updateNote } = NotesSlice.actions;
export default NotesSlice.reducer;
