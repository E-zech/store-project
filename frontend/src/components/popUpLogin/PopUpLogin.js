import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../App";
import { useNavigate } from "react-router-dom";
import './PopUpLogin.css';
import { mainColor } from "../../css/Main.style";

export default function PopUpLogin() {
    const navigate = useNavigate();
    const { setPopUpLogin } = useContext(GeneralContext);


    return (
        <>
            <section style={{
                position: 'fixed',
                top: '0px',
                bottom: '0px',
                width: '100%',
                height: 'auto',
                zIndex: '99',
                maxWidth: '2000px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#8080807d'
            }}>

                <div className="popUpWrapper" style={{
                    position: 'absolute',
                    top: '100px',
                    width: '50vw',
                    padding: '35px',
                    backgroundColor: mainColor,
                    textAlign: 'center',
                    borderRadius: '15px',
                }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                        Sign up required to add items to cart or favorites.
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginTop: '40px'
                    }}>

                        <button className="popUpLoginBtn" onClick={() => { setPopUpLogin(false); navigate('/signup') }}>Sign Up</button>

                        <button className="popUpLoginBtn" onClick={() => setPopUpLogin(false)}>Continue as Guest</button>
                    </div>
                </div>

            </section>
        </>
    )
}


