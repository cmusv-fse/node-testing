const later = function (result, where) {
    setTimeout(() => {
        where(result);
    }, 20);
}

// later("See you later!", console.log);

export { later };
