import {GlobalContext} from "../GlobalContext";
import "./Modal.css"
import {useContext, useLayoutEffect} from "react";

export default function notification() {

    const {notification, toggleNotification, notificationMessage} = useContext(GlobalContext);

    useLayoutEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                toggleNotification();
            }, 1500); //

            return () => clearTimeout(timer);
        }
    }, [notification, toggleNotification]);

    return (
        <div className="modal">
            <div onClick={toggleNotification} className="overlay"></div>
            <div className="modal-content">
                <h2>{notificationMessage}</h2>
                <button className="close-modal" onClick={toggleNotification}>
                    X
                </button>
            </div>
        </div>
    );
}