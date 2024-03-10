// src/analytics.js
import amplitude from 'amplitude-js';

export const initializeAmplitude = () => {
    amplitude.getInstance().init("1486dec43c66669fa40c6fc9a50f177d");
};

export const trackEvent = (eventName, eventData) => {
    amplitude.getInstance().logEvent(eventName, eventData);
};
