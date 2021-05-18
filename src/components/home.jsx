import React from 'react';
import Modal from './modal/Modal';
import Plants from './plant';
import Navbar from './navBar';

function Home(){
    return(
        <div className='home-container'>
            <Navbar/>
            <div className='home-label'>welcome</div>
                <section className='home-container-content'>
                    <div className='left-home-container'>
                        <Modal className='new-plant-button' modalSelected={'New Plant'}/>
                        <div>plant container</div>
                        <Plants/>
                    </div>
                    <div className='right-home-container'>have a description explaining the game</div>
                </section>
        </div>
    )
}

export default Home;