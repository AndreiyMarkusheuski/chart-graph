import { CANDLES, TICKS } from "../consts";

export const parseTicks = (data) => {
    const parsed = {};
    const {history, echo_req: {ticks_history}} = data;
    const [prices, times] = Object.values(history);
    parsed[TICKS] = prices.reduce((acc, item, index) => {
        acc[index] = {
        value: item,
        time: times[index] * 1000,
        };
        return acc;
    }, []);
    return parsed
};
export const parseCandles = (data) => {
    const parsed = {};
    const {candles, echo_req: {ticks_history}} = data;
    parsed[CANDLES] = candles.map(item => {
        const {epoch, ...rest} = item
        return {...rest, time: epoch*1000}
    })
    return parsed;
};
export const parseForCache = () => {};
