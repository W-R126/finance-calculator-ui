export enum AuthAction {
    SIGN_IN = 'signin',
    SIGN_UP = 'singup',
}

export interface AuthParameters {
    action: AuthAction;
    data: {
        username: string;
        password: string; // todo this needs to be changed to whatever format the backend accepts
    };
}

export interface AuthResultTypes {
    token: string;
}
