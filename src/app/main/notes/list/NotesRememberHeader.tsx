/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import CustomButton from './CustomButton';
import ModalTarefa from './NotesModal';

interface NotesRememberHeaderProps {
  title: string;
}

const NotesRememberHeader: React.FC<NotesRememberHeaderProps> = ({ title }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-24 md:text-32 font-extrabold tracking-tight"
        >
          {title}
        </Typography>

        <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
          <CustomButton
            color="primary"
            title="Adicionar Nota"
            icon={<AddIcon />}
            onClick={handleOpen}
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          />
        </div>
      </div>
      <ModalTarefa criar openModal={open} index={-1} actionCancel={handleClose} />
    </>
  );
};

export default NotesRememberHeader;
