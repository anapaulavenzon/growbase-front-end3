/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectUser } from 'app/store/userSlice';
import { buscarNotes, selectAll } from '../store/NotesSlice';
import { note } from '../store/types';
import NoteRemember from '../detail/NoteRemember/NoteRemember';

const NotesRememberContent: React.FC = () => {
  const notes = useAppSelector(selectAll);
  const dispatch = useAppDispatch();
  const usuarioLogado = useAppSelector(selectUser);
  const [auxNotes, setAuxNotes] = useState<note[]>([]);
  useEffect(() => {
    const { token } = usuarioLogado.data;
    dispatch(buscarNotes({ url: '/task/readTasksByUserId', token }));
  }, []);
  useEffect(() => {
    setAuxNotes(notes);
  }, [notes]);
  return (
    <>
      <Grid container spacing={1} className=" flex flex-row items-center justify-center">
        {auxNotes.map((item: any) => (
          <Grid item xl={12} key={item.id}>
            <NoteRemember id={item.id} description={item.description} detail={item.detail} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NotesRememberContent;
