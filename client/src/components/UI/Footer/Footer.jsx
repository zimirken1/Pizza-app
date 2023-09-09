import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <div className={"footer"}>
            <div className={"footer__logo-size_medium"}>
                Pizzeria
            </div>
            <div className={"footer__info"}>
                <div className={"phone_number"}>
                    +375(29)54-54-239
                </div>
                <div className={"email"}>
                    By@pizzeria.by
                </div>
            </div>
        </div>
    );
};

export default Footer;