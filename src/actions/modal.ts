export const MODAL_SHOW_REQUESTED = 'MODAL_SHOW_REQUESTED';

export interface RequestShowModal {
    type: string;
    title: string;
    body: Record<string, any>;
    buttons: Function;
}

export const requestedShowModal = (title: string, body: Record<string, any>, buttons: Function): RequestShowModal => ({
    type: MODAL_SHOW_REQUESTED, body, buttons, title
});

export const MODAL_HIDE_REQUESTED = 'MODAL_HIDE_REQUESTED';

export const requestedHideModal = (): {type: string} => ({ type: MODAL_HIDE_REQUESTED });
