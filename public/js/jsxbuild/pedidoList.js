var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PedidoList = function (_React$Component) {
    _inherits(PedidoList, _React$Component);

    /**
     * 
     * @param {*} props 
     */
    function PedidoList(props) {
        _classCallCheck(this, PedidoList);

        /**
         * 
         * @property {*} pedidos
         * @property {string} btn
         */
        var _this = _possibleConstructorReturn(this, (PedidoList.__proto__ || Object.getPrototypeOf(PedidoList)).call(this, props));

        _this.state = {
            pedidos: _this.props.ped,
            btn: "",
            imp: "false"
        };
        _this.url = _this.props.url;
        return _this;
    }

    /**
     * 
     * @param {Object} event 
     */


    _createClass(PedidoList, [{
        key: "all",
        value: function all(event) {
            /**
             * 
             * @type {string}
             */
            var url = "https://" + window.location.host + "/" + this.url + "/pedidos/view-all";
            window.location.replace(url);
        }

        /**
         * 
         * @param {Object} event 
         * @param {number} i 
         */

    }, {
        key: "mod",
        value: function mod(event, i) {
            /**
             * 
             * @type {string}
             */
            var url = "https://" + window.location.host + "/" + this.url + "/pedidos/mod/" + this.state.pedidos[i]._id;
            window.location.replace(url);
        }
    }, {
        key: "rad",
        value: function rad(event) {
            if (this.state.imp === "false") {
                this.setState({
                    imp: "true"
                });
            } else {
                this.setState({
                    imp: "false"
                });
            }
        }

        /**
         * 
         * @returns {Object}
         */

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            /**
             * 
             * @type {Object}
             */
            var st = {
                "height": "15em",
                "width": "100%",
                "overflowY": "scroll"
            };
            var styles = {
                "border": "black 1px solid",
                "borderCollapse": "collapse",
                "height": "15px",
                "wordWrap": "break-word",
                "fontSize": "13px",
                "padding": "1px"
            };
            var styleT = {
                "backgroundColor": "white",
                "border": "black 1px solid",
                "tableLayout": "fixed",
                "width": "100%"
            };

            var btn = function btn(i) {
                return React.createElement(
                    "form",
                    { action: "/fn", method: "post" },
                    React.createElement("input", { type: "button", onClick: function (event) {
                            return _this2.mod(_this2, i);
                        }.bind(_this2), value: "Entrar" }),
                    React.createElement("br", null),
                    React.createElement("input", { type: "text", name: "cancel", style: { "display": "none" }, value: JSON.stringify({ can: true, di: _this2.props.ped[i]._id }), readOnly: true }),
                    React.createElement("input", { type: "radio", id: "imp", name: "imp", value: _this2.state.imp, onClick: function (event) {
                            return _this2.rad(event);
                        }.bind(_this2) }),
                    React.createElement(
                        "label",
                        { htmlFor: "imp" },
                        "Comp"
                    ),
                    React.createElement("input", { type: "submit", value: "Finalizar" })
                );
            };

            /**
             * 
             * @type {Array<*>}
             */
            var tb = [];
            for (var i = this.state.pedidos.length - 1; i >= 0; i--) {
                tb.push(React.createElement(
                    "tr",
                    { key: i },
                    React.createElement(
                        "td",
                        { style: styles },
                        this.state.pedidos[i].fecha.substr(0, 10)
                    ),
                    React.createElement(
                        "td",
                        { style: styles },
                        this.state.pedidos[i].clientid.cedula
                    ),
                    React.createElement(
                        "td",
                        { style: styles },
                        this.state.pedidos[i].mesa
                    ),
                    React.createElement(
                        "td",
                        { style: styles },
                        this.state.pedidos[i].cancelado ? "true" : "false"
                    ),
                    React.createElement(
                        "td",
                        { style: styles },
                        "$ " + this.state.pedidos[i].precio
                    ),
                    this.state.pedidos[i].cancelado ? React.createElement(
                        "td",
                        { style: styles },
                        "-----"
                    ) : React.createElement(
                        "td",
                        { style: styles },
                        btn(i)
                    )
                ));
            }

            /**
             * 
             * @type {*}
             */
            var elem = React.createElement(
                "div",
                null,
                React.createElement(
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
                                    "Fecha"
                                ),
                                React.createElement(
                                    "th",
                                    { style: styles },
                                    "Numero de cedula"
                                ),
                                React.createElement(
                                    "th",
                                    { style: styles },
                                    "Mesa"
                                ),
                                React.createElement(
                                    "th",
                                    { style: styles },
                                    "Cancelado"
                                ),
                                React.createElement(
                                    "th",
                                    { style: styles },
                                    "Total"
                                ),
                                React.createElement(
                                    "th",
                                    { style: styles },
                                    "Opciones"
                                )
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            tb
                        )
                    )
                ),
                this.props.root ? React.createElement(
                    "button",
                    { onClick: function (event) {
                            return _this2.all(event);
                        }.bind(this) },
                    "Ver Todos"
                ) : null
            );

            return elem;
        }
    }]);

    return PedidoList;
}(React.Component);

var url = getSingle('url', function (doc) {
    return doc;
});

var root = getSingle('config', function (doc) {
    return doc;
});

var data = getVars('data', function (doc) {
    return doc;
});

var element = React.createElement(PedidoList, { url: url, ped: data, root: root });
ReactDOM.render(element, document.getElementById("ped"));