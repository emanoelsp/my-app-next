"use client";

import { useState } from 'react';
import Nav from './nav';
import { FaBars } from 'react-icons/fa';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-blue-200 py-5 px-4">
            <div className="text-xl font-bold">NEXT APP</div>
            <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                <FaBars />
            </div>
            <nav className={`flex-col md:flex md:flex-row ${isMenuOpen ? 'flex' : 'hidden'} md:gap-5`}>
                <Nav />
            </nav>
        </header>
    );
}
