import React, { useRef, useState } from "react";
import ModalContentWrapper from "./ModalContentWrapper";
import Store from '../store';
import UserInv from './../userInventory';
import Transactions from './../transactions';
function Modal(props) {
  const modalRef = useRef();
  const [modalSelected, setModalSelected] = useState(props)

  const openModal = () => {
    // console.log("open modal");
    modalRef.current.openModal();
  };

  return (
    <div>
      <button onClick={openModal}>{props.modalSelected} </button>

      <ModalContentWrapper ref={modalRef}>
        <button onClick={() => modalRef.current.close()}>Close Modal</button>
        {{ 'inventory': <UserInv/>,
          'store': <Store/>,
          'transactions' : <Transactions/>
        }[props.modalSelected] || <div>An Error has occurred</div>}
      </ModalContentWrapper>
    </div>
  );
}

export default Modal;
