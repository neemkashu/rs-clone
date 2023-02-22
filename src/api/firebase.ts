import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
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

export async function logInWithEmailAndPassword(
    email: string,
    password: string
): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    const token = await user.getIdToken();
    const currentUser = userCredential?.user?.email;
    document.cookie = `jwt=${token}; path=/; secure; sameSite=none`;
    if (currentUser) localStorage.setItem('currentUser', currentUser);
}

export async function registerWithEmailAndPassword(
    login: string,
    email: string,
    password: string
): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    const token = await user.getIdToken();
    const currentUser = userCredential?.user?.email;
    document.cookie = `jwt=${token}; path=/; secure; sameSite=none`;
    if (currentUser) localStorage.setItem('currentUser', currentUser);
}

export async function logout(): Promise<void> {
    document.cookie = `jwt=0; max-age=0`;
    signOut(auth);
}
