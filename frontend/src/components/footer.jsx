import React from 'react'

const footer = () => {
    return (
        <div>
            <hr style={hrStyle} />
            <footer style={footerStyle}>
                JGCampos999 | FilipeGundim <br />
                © - All Rights Reserveds
            </footer>
        </div>
    )
}

export default footer;

const hrStyle = {
    marginLeft: '30%',
    marginRight: '30%'
}

const footerStyle = {
    justifyContent: 'center',
    textAlign: 'center'
}