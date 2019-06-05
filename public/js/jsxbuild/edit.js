var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edit = function (_React$Component) {
    _inherits(Edit, _React$Component);

    function Edit(props) {
        _classCallCheck(this, Edit);

        var _this = _possibleConstructorReturn(this, (Edit.__proto__ || Object.getPrototypeOf(Edit)).call(this, props));

        _this.obj = [];
        return _this;
    }

    _createClass(Edit, [{
        key: "edit",
        value: function edit(event, i) {
            var _this2 = this;

            /**
             * 
             * @type {*} 
             */
            console.log(this.obj[i].current);
            var fn = this.props.data.find(function (doc) {
                return doc.nombre === _this2.obj[i].current.innerText;
            });
            console.log(fn);
            /**
             * @type {string}
             */
            var url = window.location + "/" + fn._id;
            window.location.replace(url);
            console.log(url);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            /**
             * 
             * @type {Object} 
             */
            var styles = {
                "border": "black 1px solid",
                "borderCollapse": "collapse",
                "height": "15px",
                "wordWrap": "break-word",
                "fontSize": "13px",
                "padding": "1px"

                /**
                 * 
                 * @type {Object} 
                 */
            };var styleT = {
                "backgroundColor": "white",
                "border": "black 1px solid",
                "tableLayout": "fixed",
                "width": "75%"

                /**
                 * 
                 * @type {Object} 
                 */
            };var st = {
                "height": "20em",
                "width": "100%",
                "overflowY": "scroll"

                /**
                 * 
                 * @type {Array<*>} 
                 */
            };var filas = [];

            var _loop = function _loop(i) {
                if (_this3.props.data.hasOwnProperty(i)) {
                    _this3.obj.push(React.createRef());
                    filas.push(React.createElement(
                        "tr",
                        { key: i.toString() },
                        React.createElement(
                            "td",
                            { ref: _this3.obj[i], style: styles, onClick: function (event) {
                                    return _this3.edit(event, i);
                                }.bind(_this3) },
                            _this3.props.data[i].nombre
                        )
                    ));
                }
            };

            for (var i in this.props.data) {
                _loop(i);
            }

            /**
             * 
             * @type {*}
             */
            var elem = React.createElement(
                "div",
                { style: st },
                React.createElement(
                    "table",
                    { style: styleT },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { style: styles },
                                "Nombre:"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        filas
                    )
                )
            );
            return elem;
        }
    }]);

    return Edit;
}(React.Component);

/**
 * 
 * @type {Array<*>}
 */


var data = getVars('data', function (doc) {
    return doc;
});

var element = React.createElement(Edit, { data: data });

ReactDOM.render(element, document.getElementById('elem'));