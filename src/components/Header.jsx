import { useState, useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import Modal from './UI/Modal';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';

export default function Header() {
    const { items } = useContext(CartContext);
    const {showCart} = useContext(UserProgressContext)
    const quantity = items.length;

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Restaurant Image" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button onClick={showCart} textOnly>
                    Cart({quantity})
                </Button>
                
            </nav>
        </header>
    );
}
