import { useState, useEffect } from "react";

function AlertHandler ({ visible, duration, onDurationEnd, children }) {
    const [isVisible, setVisibility] = useState(null);

    useEffect(() => {
        setVisibility(visible);
    }, [visible]);

    if (!isVisible) return null;

    if (duration) {
        setTimeout(() => {
            setVisibility(false);

            if (onDurationEnd) {
                onDurationEnd(false);
            }
        }, duration);
    }

    return children;
}
export default AlertHandler;
