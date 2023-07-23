export type Timer = ReturnType<typeof setTimeout>;

const debounce = (func: () => any, timeout: number = 300): (...args: []) => void => {
    let timer: Timer;
    return (...args: []) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
};

export default debounce;
