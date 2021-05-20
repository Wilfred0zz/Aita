import React from 'react';
import Modal from './modal/Modal';
import Plants from './plant';
import Navbar from './navBar';
import description from './../assets/gameDescription'

function Home(){
    return(
        <div className='home-container'>
            <Navbar/>
                <section className='home-container-content'>
                    <div className='left-home-container'>
                        <div className='home-label'>welcome</div>
                        <Modal className='new-plant-button' modalSelected={'New Plant'}/>
                        <div>Your Current Plants: </div>
                        <Plants/>
                    </div>
                    <div style={{ 'white-space' :'pre-line' }} className='right-home-container'>
                        {description}
                    </div>
                </section>
        </div>
    )
}

export default Home;