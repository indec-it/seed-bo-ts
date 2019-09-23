import * as React from 'react';
import { ActionInfo } from '@indec/react-commons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    concat, every, values
} from 'lodash';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import Header from './Header';
import Routes from './Routes';
import Footer from './Footer';

import { validateSession } from '../../actions';

interface ComponentProps {
    location: {
        search: string;
    };
    validateSession: Function;
    loadingAction: {};
    savingAction: {};
    succeededAction: {};
    failedAction: {};
}

class Main extends React.PureComponent<ComponentProps> {
    static defaultProps = {
        location: {},
        loadingAction: { session: true },
        savingAction: null,
        succeededAction: null,
        failedAction: null
    };

    componentDidMount(): void {
        const params = new URLSearchParams(this.props.location.search);
        this.props.validateSession(params);
    }

    render(): React.ReactNode {
        const {
            loadingAction,
            savingAction,
            succeededAction,
            failedAction
        }: {
            loadingAction?: {};
            savingAction?: {};
            succeededAction?: {};
            failedAction?: {};
        } = this.props;

        return (
            <>
                <Header/>
                {!every(concat(values(savingAction), values(loadingAction)), (t: boolean|string) => t === false) && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '40px',
                            width: '495px',
                            right: 0,
                            zIndex: 9999
                        }}
                    >
                        <ActionInfo
                            show={succeededAction || failedAction}
                            icon={succeededAction ? faCheckCircle : faExclamationCircle}
                        >
                            <span className="text-info">
                                {
                                    succeededAction ? 'Guardado con Éxito' : 'Fallo al hacer la consulta/guardado'
                                }
                            </span>
                        </ActionInfo>
                    </span>
                )}
                <Routes/>
                <Footer/>
            </>
        );
    }
}

interface StateProps {
    actions: {
        loading: {};
        saving: {};
        failed: {};
        success: {};
    };
}

export default withRouter(connect(
    (state: StateProps) => ({
        loadingAction: state.actions.loading,
        savingAction: state.actions.saving,
        failedAction: state.actions.failed,
        succeededAction: state.actions.success
    }),
    (dispatch) => ({
        validateSession: (queryParams: string): void => dispatch(validateSession(queryParams))
    })
)(Main));
