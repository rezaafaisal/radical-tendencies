import React from 'react';
import {
    useEffect,
    useState
} from 'react';

function CountdownTimer(expire) {
    const [expiryTime, setExpiryTime] = useState(expire);
    const [countdownTime, setCountdownTime] = useState({
        countdownlMinutes: '',
        countdownSeconds: ''
    });


    const countdownTimer = () => {
        const timeInterval = setInterval(() => {
            const countdownDateTime = new Date(expiryTime);
            const currentTime = new Date().getTime();
            const remainingDayTime = countdownDateTime - currentTime;
            const tempTotalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
            const totalMinutes = tempTotalMinutes < 10 ? '0' + tempTotalMinutes : tempTotalMinutes
            const tempTotalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);
            const totalSeconds = tempTotalSeconds < 10 ? '0' + tempTotalSeconds : tempTotalSeconds

            const runningCountdownTime = {
                countdownMinutes: totalMinutes,
                countdownSeconds: totalSeconds
            }

            if (remainingDayTime < 0) {
                // clearInterval(timeInterval)
                setCountdownTime({
                    countdownMinutes: 0,
                    countdownSeconds: 0
                });
            }

            else{
                setCountdownTime(runningCountdownTime)
            }

        }, 1000);
    }

    useEffect(() => {
        countdownTimer();
    }, []);

    return countdownTime
}
export default CountdownTimer;
