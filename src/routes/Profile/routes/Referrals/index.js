module.exports = {
    path: 'referrals',
    getComponent(nextState, cb) {
        cb(null, require('./component/Referrals'))
    }
};
