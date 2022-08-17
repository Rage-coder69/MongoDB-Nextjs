import React from 'react';

const Button = ({type, value}) => {
    return(
        <div>
            <button style={{color: 'white', backgroundColor: 'violet'}} type={type} >{value}</button>
        </div>
    );
};

export default Button;