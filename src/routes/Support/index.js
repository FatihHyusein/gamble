module.exports = {
    path: 'support',

    // getChildRoutes(location, cb) {
    //     cb(null, [
    //         require('./routes/Contact'),
    //         require('./routes/FAQ'),
    //         require('./routes/Terms')
    //     ])
    // },

    getComponent(nextState, cb) {
        cb(null, require('./components/Support'))
    }
};

