import React from 'react';
import Block from './block'

const Row = ({ row }) => {
  return (
    <div className="game_row">
        {row.map((cell, i) => (<Block key={i} blockValue={cell} />))}
    </div>
  );
};

export default Row;