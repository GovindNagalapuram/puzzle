import React from 'react';

const Block = ({ blockValue }) => {
  let color = 'cell';
  let value = (blockValue === 0) ? '' : blockValue;
  if (value) {
    color += ` color-${value}`;
  }

  return (
    <div className="row">
        <div className={color}>
            <div className="number">{value}</div>
      </div>
    </div>
    
  );
};

export default Block;




