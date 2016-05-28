module.exports = {
    path: 'profile',

    getChildRoutes(location, cb) {
        cb(null, [
            require('./routes/History'),
            require('./routes/Referrals')
        ])
    },

    getComponent(nextState, cb) {
        cb(null, require('./components/Profile'))
    }
};
