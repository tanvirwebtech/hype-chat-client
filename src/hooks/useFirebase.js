import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config.firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useFirebase = () => {
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    // Sign up With Email and Password
    const signUpWithEmail = (email, pass, username, location) => {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((result) => {
                if (result.user) {
                    saveUser(email, username, pass, location);
                }
            })
            .catch((err) => {
                setErr(err);
                setLoading(false);
            })
            .finally(() => {});
    };

    // Save user to DB
    const saveUser = async (email, username, password) => {
        setLoading(true);
        // const from = location.state?.from?.pathname || "/";
        const data = { email, username, password };
        try {
            const res = await axios.post(`/${"register"}`, data);
            setUserId(res.data.userId);
            setUsername(res.data.username);
            setErr(null);
            setLoading(false);
            navigate("/chat", { replace: true });
        } catch (error) {
            setErr(error);
            setLoading(false);
        }
    };

    const signInWithEmail = (email, pass, location) => {
        const data = { email };

        signInWithEmailAndPassword(auth, email, pass)
            .then((result) => {
                if (result.user) {
                    loginUser(data, location);
                }
            })
            .catch((error) => {
                setErr(error);
                setLoading(false);
            });
    };
    // Sign in with Email and Password
    const loginUser = async (data) => {
        setLoading(true);

        try {
            const res = await axios.post(`/${"login"}`, data);
            setUserId(res.data.userId);
            setUsername(res.data.username);
            setErr(null);
            setLoading(false);
            navigate("/chat", { replace: true });
        } catch (error) {
            setErr("login failed");
            setLoading(false);
        }
    };

    // Observer Function
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.email);
                loginUser({ email: user.email });
                setLoading(false);
                // ...
            } else {
                setLoading(false);
                // User is signed out
                // ...
            }
        });
    }, []);

    // LOGOUT
    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUsername(null);
                setUserId(null);
            })
            .finally(() => {});
    };

    return {
        username,
        signInWithEmail,
        logOut,
        err,
        setErr,
        signUpWithEmail,
        setUsername,
        userId,
        setUserId,
        loading,
        setLoading,
    };
};

export default useFirebase;
