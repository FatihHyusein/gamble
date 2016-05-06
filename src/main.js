var $ = require("jquery");
var React = require('react');
var ReactDOM = require('react-dom');
//var Home = require('./components/homepage');


// tutorial8.js
var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentList = React.createClass({
    render: function () {
        var commentsEl = this.props.data.map(function (comment) {
            return (
                <div key={comment.id}>
                    {comment.author} - {comment.text} - {comment.id}
                </div>
            )
        });
        return (
            <div className="commentList">
                {commentsEl}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return {author: '', text: ''};
    },
    handleAuthorChange: function (e) {
        console.log('change');
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value});
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        // TODO: send request to the server
        this.setState({author: '', text: ''});
    },

    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                    />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    />
                <input type="submit" value="Post"/>
            </form>
        );
    }
});

var CommentBox = React.createClass({
    handleCommentSubmit: function (comment) {
        // TODO: submit to the server and refresh the list
        comment.id = data[data.length - 1].id + 1;
        data.push(comment);
        this.setState({
            data: data
        });
    },

    getInitialState: function () {
        return {
            data: data
        };
    },
    componentDidMount: function () {
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox data={data}/>,
    document.getElementById('app')
);
