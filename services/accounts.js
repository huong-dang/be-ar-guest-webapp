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

async function resetPassword(emailAddress) {
    // try {
    //     var user = fire.auth().currentUser;
    //     if (user === null || user === undefined) {
    //         throw new Error('No user is currently logged in.');
    //     } else {
    //         await user.updatePassword(newPassword);
    //         return {success: true}
    //     }
    // } catch (e) {
    //     return {success: false, error: e};
    // }
    var auth = fire.auth();
    auth.sendPasswordResetEmail(emailAddress).then(function() {
        return {success: true}
    }).catch(function(error) {
        return {success: false, error: e}
    });
}

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

export {signUp, signIn, signOut, getCurrentUser, resetPassword, deleteUser};