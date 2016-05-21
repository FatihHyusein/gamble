import MuffinDispatcher from '../../dispather/MuffinDispatcher';
import MuffinConstants from '../../constants/MuffinConstants';
import SendViaSocket from '../../actions/SocketActionCreators';

var ActionTypes = MuffinConstants.ActionTypes;

export default {

    placeBet: function () {
        

        MuffinDispatcher.dispatch({
            type: ActionTypes.PLACE_BET
        });
    }

};
