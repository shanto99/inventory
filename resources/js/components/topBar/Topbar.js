import React, {useCallback, useEffect, useState} from "react";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import { usePopper } from 'react-popper';

import { Portal } from "../../Portal";
import { logout } from "../../actions";

import ProfileIcon from "../../images/profile-8.jpg";

const Topbar = ({user, logout}) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8]
                }
            }
        ]
    });

    const closeMenu = useCallback((e) => {
        const menuContainer = document.getElementById("menuContainer");
        if(!menuContainer.contains(e.target)) {
            setOpenMenu(false);
        }
    }, [openMenu]);

    useEffect(() => {
        if(openMenu) {
            document.querySelector('body').addEventListener('click', closeMenu);
        } else {
            document.querySelector('body').removeEventListener('click', closeMenu);
        }

        return () => document.querySelector('body').removeEventListener('click', closeMenu);
    }, [openMenu, closeMenu]);

    function toggleMenu() {
        setOpenMenu(!openMenu);
    }

    return (
        <div className="top-bar">
            <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
                <a href="">Application</a> <Icon.ChevronRight/> <a href="" className="breadcrumb--active">Dashboard</a>
            </div>

            <div className="intro-x dropdown w-8 h-8" id="menuContainer">
                <div className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
                onClick={toggleMenu}
                role="button" ref={setReferenceElement}
                >
                    <img alt="Rubick Tailwind HTML Admin Template" src={ProfileIcon}/>
                </div>
                {openMenu
                ? <Portal>
                    <div
                    ref={setPopperElement}
                    style={Object.assign({}, styles.popper, {zIndex: 9999})}
                    {...attributes.popper}
                    >
                        <div className="w-56">
                            <div className="dropdown-menu__content box bg-theme-26 dark:bg-dark-6 text-white">
                                <div className="p-4 border-b border-theme-27 dark:border-dark-3">
                                    <div className="font-medium">{user.UserName}</div>
                                    <div className="text-xs text-theme-28 mt-0.5 dark:text-gray-600">{user.Designation}</div>
                                </div>
                                <div className="p-2">
                                    <a href="#" className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"> <Icon.User className="w-4 h-4 mr-2"/> Profile </a>
                                    <a href="#" className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"> <Icon.Edit className="w-4 h-4 mr-2"/> Add Account </a>
                                </div>
                                <div className="p-2 border-t border-theme-27 dark:border-dark-3">
                                    <a href="#"
                                    onClick={logout}
                                    className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"> <Icon.ToggleRight className="w-4 h-4 mr-2"/> Logout </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Portal>
                : null}

            </div>
        </div>

    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {logout})(Topbar);
