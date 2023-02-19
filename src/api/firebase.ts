import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBpJ41vU5nqaB0nZx0IAklPDRqu1zOSTHM',
    authDomain: 'rs-nonograms.firebaseapp.com',
    projectId: 'rs-nonograms',
    storageBucket: 'rs-nonograms.appspot.com',
    messagingSenderId: '801380278000',
    appId: '1:801380278000:web:3672cf1ccc99a65eb6ac35',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;
        const token = user.getIdToken();
        return token;
    } catch (err) {
        console.error(err);
        throw new Error(`Error while logging in ${err}`);
    }
};

export const registerWithEmailAndPassword = async (
    login: string,
    email: string,
    password: string
) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const { user } = userCredential;
        const token = user.getIdToken();
        return token;
    } catch (err) {
        console.error(err);
        throw new Error(`Error while register ${err}`);
    }
};
