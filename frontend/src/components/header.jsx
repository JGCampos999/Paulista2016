import React from 'react'

const header = () => {
    return (
        <header className="Header" style={headerStyle}>
            <h1>Paulistão 2019</h1>
        </header>
    )
}

export default header;

const headerStyle = {
    padding: '20px',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    height: '70px',
    backgroundColor: '#17a2b8'
}
