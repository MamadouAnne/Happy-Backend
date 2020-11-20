import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import mapMarkerImg from '../images/logo.svg';
import '../styles/pages/sidebar.css'
import logo3 from '../images/logo3.svg';

export default function Sidebar() {
    const { goBack } = useHistory();

    return (
        <aside className="app-sidebar"> <Link to="/" >
                <img src={logo3} alt="Happy" /></Link>

                <footer>
                    <button type="button" onClick={goBack}>
                        <FiArrowLeft size="24" color="FFF" />
                    </button>
                </footer>
            </aside>
    )
}
