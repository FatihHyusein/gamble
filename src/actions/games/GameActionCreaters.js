import MuffinDispatcher from '../../dispather/MuffinDispatcher';
import MuffinConstants from '../../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {

    getWinner: function () {
        MuffinDispatcher.dispatch({
            type: ActionTypes.GET_WINNER
        });
    }

};
