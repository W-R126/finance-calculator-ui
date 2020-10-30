export enum AuthAction {
    SIGN_IN = 'signin',
    SIGN_UP = 'signup',
}

export interface AuthParameters {
    action: AuthAction;
    data: {
        username: string;
        password: string;
    };
}
