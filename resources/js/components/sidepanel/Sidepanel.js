import React, {useState} from "react";
import { connect } from "react-redux";
import logo from "../../images/logo.svg";
import * as Icon from "react-feather";
import Velocity from "velocity-animate";
import { NavLink } from "react-router-dom";

const SidePanel = ({user}) => {
    const [selectedMenu, setSelectedMenu] = useState({menuId: 0, subMenuId: null});

    function toggleMenuList(e) {
        const toggleLink = e.currentTarget;
        const menuList = toggleLink.parentElement && toggleLink.parentElement.querySelector('ul');

        if(menuList && menuList.children.length > 0) {
            if(menuList.querySelector('li').offsetParent !== null) {
                toggleLink.querySelector('.side-menu__sub-icon').classList.remove('transform');
                toggleLink.querySelector('.side-menu__sub-icon').classList.remove('rotate-180');
                toggleLink.classList.remove('side-menu--open');

                Velocity(menuList, "slideUp", {
                    duration: 300,
                    complete: function(el) {
                         menuList.classList.remove("side-menu__sub-open");
                    }
                });
            } else {
                toggleLink.querySelector('.side-menu__sub-icon').classList.add('transform');
                toggleLink.querySelector('.side-menu__sub-icon').classList.add('rotate-180');
                toggleLink.classList.remove('side-menu--open');

                Velocity(menuList, "slideDown", {
                    duration: 300,
                    complete: function(el) {
                         menuList.classList.add("side-menu__sub-open");
                    }
                });
            }
        }
    }

    function isMenuActive(menuId, subMenuId) {
        if(subMenuId) {
            return selectedMenu.menuId === menuId && selectedMenu.subMenuId === subMenuId;
        }

        return selectedMenu.menuId === menuId;
    }

     function selectMenu(menuId, subMenuId) {
        setSelectedMenu({menuId, subMenuId});
    }

    function subMenuList(menu) {
        const subMenus = menu.sub_menu;
        const subMenuNames = Object.keys(subMenus);
        return subMenuNames.map(function(subMenuName) {
            const subMenu = subMenus[subMenuName];
            const active = isMenuActive(menu.id, subMenu.id)
            return (
                <li>
                    <NavLink to={`${subMenu.route || "#"}`} onClick={selectMenu.bind(null, menu.id, subMenu.id)} className = {`side-menu ${active ? 'side-menu--active' : ''}`}>
                        <div className="side-menu__icon"> <Icon.Activity/> </div>
                        <div className="side-menu__title"> {subMenu.title} </div>
                    </NavLink>
                </li>
            )
        });
    }


    return (
        <React.Fragment>
            <nav className="side-nav">
                <a href="" className="intro-x flex items-center pl-5 pt-4">
                    <img alt="Rubick Tailwind HTML Admin Template" className="w-6" src={logo}/>
                    <span className="hidden xl:block text-white text-lg ml-3"> Ru<span className="font-medium">bick</span> </span>
                </a>
                <div className="side-nav__devider my-6"></div>
                <ul>
                    {Object.keys(user.menus).map(function(menuName) {
                        const menu = user.menus[menuName];
                        const subMenus = menu.sub_menu;
                        const menuActive = isMenuActive(menu.id);
                        return (
                            <li>
                                <NavLink to={`${menu.route || "#"}`} onClick={subMenus ? toggleMenuList : selectMenu.bind(null, menu.id)}

                                className= {`side-menu ${menuActive ? 'side-menu--active' : ''}`}>
                                    <div className="side-menu__icon"> <Icon.Home/> </div>
                                    <div className="side-menu__title">
                                        {menuName}
                                        { subMenus
                                        ? <div className="side-menu__sub-icon transform rotate-180"> <Icon.ChevronDown/> </div>
                                        : null}
                                    </div>
                                </NavLink>
                                { subMenus
                                ? <ul className="">
                                    {subMenuList(menu)}
                                  </ul>
                                : null}
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SidePanel);
