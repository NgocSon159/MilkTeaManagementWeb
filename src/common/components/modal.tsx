import * as React from 'react';

export const Modal = ({ handleClose, show, children }: any) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div>modal title<span style={{float: "right"}} onClick={handleClose}>X</span></div>
          {children}
          {/* <button onClick={handleClose}>close</button> */}
        </section>
      </div>
    );
  };