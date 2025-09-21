import React from 'react';
import './EllipsisLoader.scss';

const EllipsisLoader: React.FC = () => {
  return (
    <>
      <div className="lds-ellipsis-backdrop">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default EllipsisLoader;
