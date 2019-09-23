/* global ENDPOINT */
import Http from './http';
import {buildQueryString} from '@util/index';

declare const ENDPOINT : {
    env: {
        ENDPOINT: string;
    }
}

export default class UserService {
    static fetch(searchParams) {
        return Http.get(`${ENDPOINT}api/logs${buildQueryString(searchParams)}`);
    }
}
