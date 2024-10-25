import { useState } from 'react';
import styles from "../../src/styles/Navbar.module.css"; 
import Link from 'next/link';

const Navbar = () => {
    const [menuOpen, SetMenuOpen] = useState(false);

    const closeMenu = () => {
        SetMenuOpen(false);
    };

    return (
        <header className={`py-3 px-2 flex justify-around items-center flex-wrap lg:py-7 bg-gray-800 rounded-lg ${styles.header}`}>
            <div className="z-50">
                <h2 className="text-2xl text-yellow-500 font-bold hover:text-white">
                    <Link href="/" title="ScaleNow">ScaleNow</Link>
                </h2>
            </div>
            <nav>
                <ul className={`menu hidden absolute left-0 top-0 m-0 py-20 pt-16 px-4 bg-black z-40 w-full h-40 sm:w-unset sm:h-auto sm:bg-transparent sm:flex sm:py-0 sm:static sm:left-unset sm:top-unset ${styles.menu} ${menuOpen ? styles.open : ""}`}>
                    <li className="mb-4 mt-2 mx-0 sm:mb-0 sm:mt-0 sm:mx-3" title="Experiences">
                        <Link href="/" onClick={closeMenu}>
                            <span className="text-1xs text-yellow-500 font-semibold ease-in-out duration-150 hover:text-white cursor-pointer">Compress Image</span>
                        </Link>
                    </li>
                    <li className="mb-4 mx-0 sm:mb-0 sm:mx-3 " title="Projects">
                        <Link href="/removebg" onClick={closeMenu}>
                            <span className="text-1xs  text-yellow-500 font-semibold ease-in-out duration-150 hover:text-white cursor-pointer">Remove Background</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div
                className={`z-50 flex flex-col justify-center items-center sm:hidden ${styles.hamburger} ${menuOpen ? styles.open : ""}`}
                onClick={() => SetMenuOpen(!menuOpen)}
            >
                <span className="h-0.5 w-7 mb-1.5 bg-white"></span>
                <span className="h-0.5 w-7 mb-1.5 bg-white"></span>
                <span className="h-0.5 w-7 mb-1.5 bg-white"></span>
            </div>
        </header>
    );
};

export default Navbar;
