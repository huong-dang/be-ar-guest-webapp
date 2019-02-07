import fire from '../fire';

// Function that creates an account via firebase auth
const signUp = async (email, password) => {
    if (!email || !password) {
        throw `No username or password was given!`;
    }

    return fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(success => success.user.uid)
        .catch(err => {
            throw err;
        });
};

const signIn = async (email, password) => {
    if (!email || !password) {
        throw `No username or password was given!`;
    }

    return fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(success => success)
        .catch(err => {
            throw err;
        });
};

const getCurrentUser = () => {
    return new Promise((resolve) => {
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
        });
    });
};

const signOut = () => {
    return fire.auth().signOut();
};

const deleteUser = async callback => {
    try {
        const user   = fire.auth().currentUser;
        const result = await user.delete();
        callback({success: true});
    } catch (e) {
        console.log('Error deleting user from firebase:', e);
    }
};

export {signUp, signIn, signOut, getCurrentUser, deleteUser};
