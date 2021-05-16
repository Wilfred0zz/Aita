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
      <li className='nav-options' onClick={openModal}>{props.modalSelected} </li>

      <ModalContentWrapper ref={modalRef}>
        <section className='modal-header'>
          <button className='close-modal-button' onClick={() => modalRef.current.close()}>Close {props.modalSelected} </button>
          <div className='modal-title'> {props.modalSelected} </div>
        </section>
        {{ 'Inventory': <UserInv/>,
          'Store': <Store/>,
          'Transactions' : <Transactions/>
        }[props.modalSelected] || <div>An Error has occurred</div>}
      </ModalContentWrapper>
    </div>
  );
}

export default Modal;
