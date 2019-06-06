var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edit = function (_React$Component) {
    _inherits(Edit, _React$Component);

    function Edit(props) {
        _classCallCheck(this, Edit);

        var _this = _possibleConstructorReturn(this, (Edit.__proto__ || Object.getPrototypeOf(Edit)).call(this, props));

        _this.state = {
            nombre: props.data.nombre,
            familyid: props.data.familyid,
            lugar: props.data.lugar,
            precio: props.data.precio.precio,
            iva: props.data.precio.iva,
            descripcion: props.data.descripcion
        };
        return _this;
    }

    _createClass(Edit, [{
        key: "setNombre",
        value: function setNombre(event) {
            this.setState({
                nombre: event.target.value
            });
        }
    }, {
        key: "setPrecio",
        value: function setPrecio(event) {
            this.setState({
                precio: event.target.value
            });
        }
    }, {
        key: "des",
        value: function des(event) {
            this.setState({
                descripcion: event.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            /**
             * 
             * @type {Array<*>} 
             */
            lista = [];
            for (var i in this.props.fam) {
                if (this.props.fam.hasOwnProperty(i)) {
                    lista.push(React.createElement(
                        "option",
                        { value: this.props.fam[i]._id, key: i, selected: this.props.fam[i]._id === this.state.familyid ? true : false },
                        this.props.fam[i].nombre
                    ));
                }
            }

            /**
             * 
             * @type {Array<*>} 
             */
            lista1 = [];
            for (var _i in this.props.sfam) {
                if (this.props.sfam.hasOwnProperty(_i)) {
                    lista1.push(React.createElement(
                        "option",
                        { value: this.props.sfam[_i]._id, key: _i, selected: this.props.sfam[_i]._id === this.state.familyid ? true : false },
                        this.props.sfam[_i].nombre
                    ));
                }
            }

            /**
             * 
             * @type {*} 
             */
            var elem = React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { action: "/editProd", encType: "multipart/form-data", method: "post" },
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "label",
                            { htmlFor: "nombre" },
                            "Nombre:\xA0"
                        ),
                        React.createElement("input", { type: "text", id: "nombre", name: "nombre", value: this.state.nombre, onChange: function (event) {
                                return _this2.setNombre(event);
                            }.bind(this) })
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "label",
                            { htmlFor: "familyid" },
                            "seleccionar Familia o Subfamilia:\xA0"
                        ),
                        React.createElement(
                            "select",
                            { name: "familyid", id: "familyid" },
                            React.createElement(
                                "optgroup",
                                { label: "Family" },
                                lista
                            ),
                            React.createElement(
                                "optgroup",
                                { label: "Sub-Family" },
                                lista1
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "label",
                            { htmlFor: "precio" },
                            "Precio:\xA0"
                        ),
                        React.createElement("input", { type: "text", id: "precio", name: "precio", value: this.state.precio, onChange: function (event) {
                                return _this2.setPrecio(event);
                            }.bind(this) })
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement("input", { type: "file", name: "imagen", accept: "image/*", id: "imagen" })
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "label",
                            { htmlFor: "descripcion" },
                            "descripcion:\xA0"
                        ),
                        React.createElement("textarea", { name: "descripcion", id: "descripcion", cols: "30", rows: "4", onChange: function (event) {
                                return _this2.des(event);
                            }.bind(this), value: this.state.descripcion })
                    ),
                    React.createElement("input", { type: "text", name: "iva", value: this.state.iva ? "true" : "false", style: { "display": "none" }, readOnly: true }),
                    React.createElement(
                        "div",
                        null,
                        React.createElement("input", { type: "submit", value: "Guardar Cambios" })
                    )
                ),
                React.createElement(
                    "form",
                    { action: "/elimProd", method: "post" },
                    React.createElement("input", { type: "text", name: "id", value: this.props.data._id, style: { "display": "none" }, readOnly: true }),
                    React.createElement("input", { type: "submit", value: "Eliminar" }),
                    React.createElement(
                        "span",
                        null,
                        "Se elimina el plato Seleccionado"
                    )
                )
            );
            console.log(this.state.iva);
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

/**
 * 
 * @type {Array<*>}
 */
var dfam = getVars('fam', function (doc) {
    return doc;
});

/**
 * 
 * @type {Array<*>}
 */
var dsfam = getVars('sfam', function (doc) {
    return doc;
});

/**
 * 
 * @type {*} 
 */
var element = React.createElement(Edit, { data: data, fam: dfam, sfam: dsfam });

ReactDOM.render(element, document.getElementById('elem'));