module.exports = {
    path: 'faq',
    getComponent(nextState, cb) {
        cb(null, require('./component/Faq'))
    }
};
