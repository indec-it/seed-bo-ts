export interface UserInterface {
    isValid: Function;
    id: string;
    username: string;
    name: string;
    surname: string;
    roles: string[];
    attributes: object;
}

class User <UserInterface> {
    constructor(prop) {
        Object.assign(this, prop);
    }
}

// eslint-disable-next-line import/prefer-default-export
export { User };
