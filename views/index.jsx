var React = require('react');
var request = require('request');
var Url = require('url');

var TodoForm = React.createClass({
    propTypes: {
        onNewTodo: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return { text: '' };
    },
    changeText: function (ev) {
        this.setState({ text: ev.target.value });
    },
    addTodo: function(ev) {
        ev.preventDefault();
        this.props.onNewTodo(this.state.text);
        this.setState({ text: '' });
    },
    render: function() {
        return (
            <form onSubmit={this.addTodo} autoComplete="off">
                <div className="form-group">
                    <input type="text" id="newTodo" name="newTodo" className="form-control" placeholder="New todo..." onChange={this.changeText} value={this.state.text} />
                </div>
                 <button type="submit" className="btn btn-default">Add</button>
            </form>
        );
    }
});

var Todos = React.createClass({
    propTypes: {
        todos: React.PropTypes.array  
    },
    getInitialState: function () {
        return {
            todos: (this.props.todos || [])
        };
    },
    componentDidMount: function() {
        request({
            method: 'POST',
            url: Url.resolve(window.location.href, '/list'),
            json: true
        }, 
        (function(error, response, body) {
            this.setState({
                todos: body
            });
        }).bind(this));
    },
    onNewTodo: function (text) { 
        request({
            method: 'POST',
            uri: Url.resolve(window.location.href, '/new'),
            json: true,
            body: { text: text }
        },
        (function (error, response, body) {
            if (!error && response.statusCode == 200) {
                
                this.state.todos = body;
                
                this.setState({
                    todos: this.state.todos
                });
            }
        }).bind(this));
    },
    render: function () {
        var todos = this.state.todos.map((function (todo, i) {
            var onDelete = this.componentDidMount.bind(this);
            return (<Todo key={todo.text} text={todo.text} done={todo.done} onDelete={onDelete}></Todo>);
        }).bind(this));
        
        return (
            <div>
                <h3>Todo</h3>
                {todos}
                <div className="row">
                    <div className="col-xs-12">
                        <TodoForm onNewTodo={this.onNewTodo}></TodoForm>
                    </div>
                </div>
            </div>
        );
    }
});

var Todo = React.createClass({
    propTypes: {
      text: React.PropTypes.string.isRequired,
      done: React.PropTypes.bool.isRequired,
      onDelete: React.PropTypes.func.isRequired,
    },
    getInitialState: function () {
        return {
            text: this.props.text,
            done: this.props.done
        };
    },
    handleChange: function () {
        console.log('State changed');
        var t = this;
        
        request({
            method: 'POST',
            uri: Url.resolve(window.location.href, '/change'),
            json: true,
            body: {
                text: this.state.text,
                done: !this.state.done
             }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                t.setState({
                    done: body.done
                });
            }
        });
    },
    handleDelete: function() {
        var text = this.state.text;
        console.log('DELETE ' + text);
        request({
            method: 'POST',
            uri: Url.resolve(window.location.href, '/delete'),
            json: true,
            body: {
                text: this.state.text
             }
        },
        (function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('DELETED ' + text);
                this.props.onDelete();
            }
        }).bind(this));
    },
    renderText: function() {
        if(this.state.done) return (<del>{this.props.text}</del>);
        else return (<span>{this.props.text}</span>)
    },
    render: function () {
        var text = 
            this.state.done
                ? (<del>{this.props.text}</del>)
                : (<span>{this.props.text}</span>);
        return (
            <div className="row">
                <div className="col-xs-8">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" checked={this.state.done} onChange={this.handleChange} />
                            {text}
                        </label>
                    </div>
                </div>
                <div className="col-xs-4">
                    <button type="button" className="btn btn-default pull-right" onClick={this.handleDelete}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = Todos;