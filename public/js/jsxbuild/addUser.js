var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddUser = function (_React$Component) {
    _inherits(AddUser, _React$Component);

    /**
     * 
     * @param {*} props 
     */
    function AddUser(props) {
        _classCallCheck(this, AddUser);

        /**
         * 
         * @property {string} nombre
         * @property {string} url
         * @property {string} pass
         * @property {bool} root
         * @property {string} cargo
         */
        var _this = _possibleConstructorReturn(this, (AddUser.__proto__ || Object.getPrototypeOf(AddUser)).call(this, props));

        _this.state = {
            nombre: "",
            url: "",
            pass: "",
            root: false,
            cargo: ""
        };
        return _this;
    }

    _createClass(AddUser, [{
        key: "setName",
        value: function setName(event) {
            this.setState({
                nombre: event.target.value
            });
        }
    }, {
        key: "setUrl",
        value: function setUrl(event) {
            this.setState({
                url: event.target.value
            });
        }
    }, {
        key: "setPass",
        value: function setPass(event) {
            this.setState({
                pass: event.target.value
            });
        }
    }, {
        key: "setRoot",
        value: function setRoot(event) {
            if (this.state.root) {
                this.setState({
                    root: false
                });
            } else {
                this.setState({
                    root: true
                });
            }
        }
    }, {
        key: "setCargo",
        value: function setCargo(event) {
            this.setState({
                cargo: event.target.value
            });
        }

        /**
         * 
         * @returns {*}
         */

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            /**
             * 
             * @type {*}
             */
            var elem = React.createElement(
                "form",
                { action: "/addUser", method: "post" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        { htmlFor: "name" },
                        "Nombre:"
                    ),
                    React.createElement("input", { type: "text", name: "nombre", id: "name", value: this.state.nombre, onChange: function (event) {
                            return _this2.setName(event);
                        }.bind(this), required: true })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        { htmlFor: "url" },
                        "Direccion (url):"
                    ),
                    React.createElement("input", { type: "text", name: "url", id: "url", value: this.state.url, onChange: function (event) {
                            return _this2.setUrl(event);
                        }.bind(this), required: true })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        { htmlFor: "pass" },
                        "Contrase\xF1a:"
                    ),
                    React.createElement("input", { type: "password", name: "pass", id: "pass", value: this.state.pass, onChange: function (event) {
                            return _this2.setPass(event);
                        }.bind(this), required: true })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", { type: "radio", name: "root", id: "root", value: this.state.root, onClick: function (event) {
                            return _this2.setRoot(event);
                        }.bind(this) }),
                    React.createElement(
                        "label",
                        { htmlFor: "root" },
                        "Acceso root"
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        { htmlFor: "cargo" },
                        "Cargo/Puesto:"
                    ),
                    React.createElement("input", { type: "text", name: "cargo", id: "cargo", value: this.state.cargo, onChange: function (event) {
                            return _this2.setCargo(event);
                        }.bind(this), required: true })
                ),
                React.createElement(
                    "div",
                    null,
                    this.state.cargo != "" && this.state.nombre != "" && this.state.pass != "" && this.state.url != "" && this.state.pass.length >= 7 && this.state.confirm ? React.createElement("input", { type: "submit", value: "Guardar Usuario" }) : React.createElement("input", { type: "submit", value: "Guardar Usuario", disabled: true }),
                    React.createElement("input", { type: "reset", value: "Limpiar Datos" })
                )
            );

            return elem;
        }
    }]);

    return AddUser;
}(React.Component);

var elemento = React.createElement(AddUser, null);

ReactDOM.render(elemento, document.getElementById('addUser'));