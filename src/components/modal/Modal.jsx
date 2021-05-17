import React, { useRef, useState } from "react";
import ModalContentWrapper from "./ModalContentWrapper";
import Store from '../store';
import UserInv from './../userInventory';
import Transactions from './../transactions';
import Profile from './../profile';
import NewPlant from './../newPlant';

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
          <img src={'/images/exit.svg'} 
            style={{height:'30px', padding: '10px'}} 
            className='close-modal-button' 
            onClick={() => modalRef.current.close()}
          />
          <div className='modal-title'> {props.modalSelected} </div>
        </section>
        {{ 'Inventory': <UserInv/>,
          'Store': <Store/>,
          'Transactions' : <Transactions/>,
          'Profile' : <Profile/>,
          'New Plant': <NewPlant/>,
        }[props.modalSelected] || <div>An Error has occurred</div>}
      </ModalContentWrapper>
    </div>
  );
}

export default Modal;
