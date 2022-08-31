import React from 'react';

interface NoteProps {
  property?: string;
}

const Note: React.FC<NoteProps> = ({ property }) => {
  return (
    <>
      <h1>remember</h1>
      <p>{property}</p>
    </>
  );
};

export default Note;
