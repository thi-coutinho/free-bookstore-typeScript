
type error = {
    name:string,
    message:string
}
function conflictError(message: string): error {
    return {
        name: "ConflictError",
        message,
    };
}

function duplicatedEmailError(email: string): error & {email:string} {
    return {
        name: "DuplicatedEmailError",
        message: "There is already an user with given email",
        email,
    };
}

function unauthorizedError(): error {
    return {
        name: "UnauthorizedError",
        message: "You must be signed in to continue",
    };
}

function notFoundError(): error {
    return {
        name: "NotFoundError",
        message: "No result for this search!",
    };
}

function invalidCredentialsError(): error {
    return {
        name: "InvalidCredentialsError",
        message: "Email or password are incorrect",
    };
}

export default {
    conflictError,
    duplicatedEmailError,
    unauthorizedError,
    notFoundError,
    invalidCredentialsError,
};
