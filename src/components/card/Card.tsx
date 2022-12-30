import React from 'react';
import './card.scss';
import Image from '../../assets/card-Images/tetris.png';

const card: React.FC = () => {
    return (
        <div className='card-wrapper'>
            <div className='card'>
                <div className='image-wrapper'>
                    <img src={Image} alt='tetris' />
                </div>
                <div className='infor-wrapper'>dasdas</div>
            </div>
        </div>
    );
};
export default card;
