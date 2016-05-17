import Constants from '../../../../constants/MuffinConstants';

module.exports = {
    path: Constants.ROUTES.support,
    getComponent(nextState, cb) {
        cb(null, require('./component/NestedMarked'))
    }
};
