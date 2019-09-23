import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Nav,
    Navbar,
    NavItem,
    NavbarToggler,
    NavbarBrand,
    Collapse,
    NavLink
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import {
    faBars, faPowerOff, faSyncAlt
} from '@fortawesome/free-solid-svg-icons';

import { requestSignOut } from '~actions/index';

const signOut = (): void => {
    useDispatch()(requestSignOut);
};

class Header extends React.PureComponent<{}, {isCollapse: boolean; isDropdownCollapse: boolean}> {
    constructor(props) {
        super(props);
        this.state = {
            isCollapse: false,
            isDropdownCollapse: false
        };
    }

    toggleNavbar(): void {
        this.setState((prevState) => ({
            isCollapse: !prevState.isCollapse
        }));
    }

    toggleDropDown(): void {
        this.setState((prevState) => ({
            isDropdownCollapse: !prevState.isDropdownCollapse
        }));
    }

    render(): React.ReactNode {
        const redirect = (to: string): void => {
            const history: Array<string> = useSelector((state: {history: Array<string>}) => state.history);
            history.push(to);
        };
        return (
            <header className="hidden-print">
                <Navbar expand="lg" fixed="top">
                    <NavbarBrand href="/" className="mr-auto"/>
                    <NavbarToggler onClick={(): void => this.toggleNavbar()}>
                        <FontAwesomeIcon icon={faBars} className="text-white"/>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isCollapse} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink onClick={(): void => redirect('/logs')}>
                                    <FontAwesomeIcon icon={faSyncAlt}/>
                                    &nbsp;&nbsp;Sincronizaciones
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={(): void => signOut()}>
                                    <FontAwesomeIcon icon={faPowerOff}/>
                                    &nbsp;&nbsp;Cerrar sesión
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

export default withRouter(Header);
