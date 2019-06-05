var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edit = function (_React$Component) {
    _inherits(Edit, _React$Component);

    function Edit(props) {
        _classCallCheck(this, Edit);

        return _possibleConstructorReturn(this, (Edit.__proto__ || Object.getPrototypeOf(Edit)).call(this, props));
    }

    _createClass(Edit, [{
        key: "render",
        value: function render() {
            /**
             * 
             * @type {*} 
             */
            var elem = React.createElement(
                "div",
                null,
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