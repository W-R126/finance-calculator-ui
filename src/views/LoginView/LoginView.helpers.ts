export const getErrorMessage = (signingUp: boolean, error_status?: string | number): string => {
    if (error_status) {
        if (error_status === 422) {
            if (signingUp) {
                return 'username unavailable';
            }
            return 'incorrect username or password';
        }
        return 'unknown error occurred, please try again later';
    }
    return '';
};
