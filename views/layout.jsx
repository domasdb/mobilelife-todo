var React = require('react');

var Layout = React.createClass({
    propTypes: {
        scripts: React.PropTypes.array,
        styles: React.PropTypes.array
    },
    render: function(){
        var scripts = this.props.scripts.map(function (script) {
            return React.DOM.script({ src: script });
        });
        var styles = this.props.styles.map(function (style) {
            return React.DOM.link({
                rel: 'stylesheet',
                type: 'text/css',
                href: style
            });
        });
        
        return (
          <html>
            <head>
                {styles}
                <title>ToDO list</title>
            </head>
            <body>
                <div id="container" className="container"></div>
                {scripts}
            </body>
          </html>  
        );
    }
});

module.exports = Layout;