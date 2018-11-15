
export const increment = (scoreCounter) => {
    localStorage.setItem('scoreCounter', ++scoreCounter);
    return {
        type: 'increment', scoreCounter: scoreCounter
    }
};
