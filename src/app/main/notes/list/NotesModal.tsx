/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, FormGroup, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectUser } from 'app/store/userSlice';
import CustomButton from './CustomButton';
import { atualizarNote, criarNote, selectAll, selectById, updateNote } from '../store/NotesSlice';
import { datum, note } from '../store/types';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};

interface NotesModalProps {
  openModal: boolean;
  id: string;
  criar: boolean;
  actionCancel: () => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ openModal, id, criar, actionCancel }) => {
  const [open, setOpen] = useState(false);
  const notes = useAppSelector(selectAll);
  const [auxNotes, setAuxNotes] = useState<note[]>([]);
  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const usuarioLogado = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const note = useAppSelector((state) => selectById(state, id));

  useEffect(() => {
    setAuxNotes(notes);
  }, [notes]);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    if (criar) {
      setTitulo('');
      setDescricao('');
    }
    if (!criar) {
      setTitulo(note?.description ?? '');
      setDescricao(note?.detail ?? '');
    }
  }, []);

  const handleCriar = () => {
    console.log('ENTROU NO CRIAR TAREFA');
    const { token } = usuarioLogado.data;
    const novaNote: datum = {
      description: titulo,
      detail: descricao,
      token,
    };
    console.log(novaNote);
    dispatch(criarNote({ url: '/task', data: novaNote }));
    handleClose();
  };

  const handleAtualizar = () => {
    const { token } = usuarioLogado.data;
    const noteAtualizada = {
      id,
      description: titulo,
      detail: descricao,
      token,
    };
    console.log('atualizar', noteAtualizada);
    dispatch(atualizarNote({ url: '/task', data: noteAtualizada }));
    dispatch(updateNote({ id, changes: { description: titulo, detail: descricao } }));
    handleClose();
  };

  const handleClose = () => {
    actionCancel();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormGroup>
          <Grid container className="flex flex-col space-y-3 h-full">
            <Grid item xs={12} className="mb-20 flex flex-col justify-center items-center">
              {criar ? (
                <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-10">
                  Cadastrar Nota
                </Typography>
              ) : (
                <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-10">
                  Editar Nota
                </Typography>
              )}
              <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-10">
                Título da Nota
              </Typography>
              <TextField
                id="titulo-nota"
                label="Título"
                multiline
                defaultValue={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className="flex flex-col justify-center items-center">
              <Typography id="modal-modal-description" className="mb-10">
                Escreva os detalhes da sua nota!
              </Typography>
              <TextField
                id="descricao-nota"
                label="Descrição"
                multiline
                rows={4}
                defaultValue={descricao}
                className="mb-20"
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className="flex flex-row space-x-20 justify-center items-center">
              {criar ? (
                <>
                  <CustomButton
                    color="primary"
                    title="Adicionar"
                    onClick={handleCriar}
                    icon={<AddIcon />}
                  />
                </>
              ) : (
                <CustomButton
                  color="primary"
                  title="Salvar"
                  icon={<SaveIcon />}
                  onClick={handleAtualizar}
                />
              )}
              <CustomButton
                color="primary"
                title="Cancelar"
                icon={<CloseIcon />}
                onClick={() => handleClose()}
              />
            </Grid>
          </Grid>
        </FormGroup>
        ;
      </Box>
    </Modal>
  );
};

export default NotesModal;
