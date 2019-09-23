export const SESSION_REQUESTED = 'SESSION_REQUESTED';
export const SESSION_RECEIVED = 'SESSION_RECEIVED';
export const AN_ERROR_OCCURRED = 'AN_ERROR_OCCURRED';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const IS_MOBILE = 'IS_MOBILE';

export function requestSession() {
    return { type: SESSION_REQUESTED };
}

export function receiveSession(profile) {
    return { type: SESSION_RECEIVED, profile };
}

export const anErrorOccurred = (error) => ({ type: AN_ERROR_OCCURRED, error });
export const clearError = () => ({ type: CLEAR_ERROR });
export const setIsMobile = (isMobile) => ({ type: IS_MOBILE, isMobile });

export const SIGN_OUT_REQUESTED = 'SIGN_OUT_REQUESTED';
export const requestSignOut = () => ({
    type: SIGN_OUT_REQUESTED
});

export const VALIDATE_SESSION = 'VALIDATE_SESSION';
export const validateSession = (queryParams) => ({ type: VALIDATE_SESSION, queryParams });

export const DONE_VALIDATE_SESSION = 'DONE_VALIDATE_SESSION';
export const doneValidateSession = () => ({ type: DONE_VALIDATE_SESSION });

export const SAVE_SESSION = 'SAVE_SESSION';
export const saveSession = (profile) => ({ type: SAVE_SESSION, profile });

export const SAVING = 'SAVING';
export const LOADING = 'LOADING';
export const FAILED = 'FAILED';
export const SUCCESS = 'SUCCESS';

export const savingAction = (saving): {} => ({
    type: SAVING,
    ...saving
});

export const loadingAction = (loading): {} => ({
    type: LOADING,
    ...loading
});

export const failedAction = (failed): {} => ({
    type: FAILED,
    ...failed
});

export const successAction = (success): {} => ({
    type: SUCCESS,
    ...success
});
