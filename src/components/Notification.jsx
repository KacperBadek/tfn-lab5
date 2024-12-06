import {GlobalContext} from "../GlobalContext";
import "./Modal.css"
import {useContext, useLayoutEffect} from "react";

export default function notification() {

    const {state, dispatch} = useContext(GlobalContext);

    const toggleNotification = () => {
        dispatch({ type: "SET_NOTIFICATION", value: !state.notification });
    };

    useLayoutEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                toggleNotification()
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className="modal">
            <div onClick={toggleNotification} className="overlay"></div>
            <div className="modal-content">
                <h2>{state.notificationMessage}</h2>
                <button className="close-modal" onClick={toggleNotification}>
                    X
                </button>
            </div>
        </div>
    );
}