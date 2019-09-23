/* global ENDPOINT */
import http from './http';

declare const ENDPOINT : {
    env: {
        ENDPOINT: string;
    }
}

export default class StaticDataService {
    static fetch() {
        return http.get(`${ENDPOINT}public-api/staticData`);
    }
}
