import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = '' }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    
    // Show or hide the modal based on the 'open' prop
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }

    // Clean up function to ensure modal is closed when component unmounts or 'open' changes
    return () => modal.close();
  }, [open]);

  // Render modal using createPortal to append to the #modal element in the DOM
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
