export interface AuthParameters {
    username: string;
    password: string; // todo this needs to be changed to whatever format the backend accepts
}

export interface AuthResultTypes {
    token: string;
}
