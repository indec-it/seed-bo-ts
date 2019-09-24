import * as React from 'react';
import { Row, Col } from 'reactstrap';
import UserService from '~services/user';
import { UserInterface } from '~models/index';

declare const VERSION: string;
declare const DESCRIPTION: string;

const Footer = (): React.ReactNode => {
    const session: UserInterface = UserService.getSession();
    return (
        <footer className="hidden-print bg-dark text-white footer">
            <Row>
                <Col sm={12} md={6}>
                    <span className="texts-signin">
                        {session && `${session.surname}, ${session.name}`}
                    </span>
                    <div className="version">
                        {`Version ${VERSION}`}
                    </div>
                </Col>
                <Col sm={12} md={3}/>
                <Col sm={12} md={3} className="justify-content-center align-self-center text-right">
                    <h6>{DESCRIPTION}</h6>
                </Col>
            </Row>
        </footer>
    );
};

export default Footer;
