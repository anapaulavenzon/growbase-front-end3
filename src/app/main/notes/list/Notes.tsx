/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import { Typography } from '@mui/material';
import React from 'react';
import NotesRememberContent from './NotesRememberContent';
import NotesRememberHeader from './NotesRememberHeader';

interface NotesProps {
  property?: string;
}

const Notes: React.FC<NotesProps> = ({ property }) => {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
    <FusePageCarded
      header={<NotesRememberHeader title="Lista de Notas" showInput />}
      content={
        <>
          <Typography variant="body1" sx={{ padding: '30px' }}>
            Essas são suas notas ainda não cumpridas.
          </Typography>
          <NotesRememberContent />
        </>
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
};

export default Notes;
