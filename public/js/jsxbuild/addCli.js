var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Client = function (_React$Component) {
     _inherits(Client, _React$Component);

     function Client(props) {
          _classCallCheck(this, Client);

          var _this = _possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this, props));

          _this.state = {
               nombre: "",
               cedula: "",
               telefono: "",
               ciudad: "",
               calles: "",
               mail: "",
               men: ""
          };
          _this.nom = _this.nom.bind(_this);
          _this.ci = _this.ci.bind(_this);
          _this.tel = _this.tel.bind(_this);
          _this.ciu = _this.ciu.bind(_this);
          _this.calle = _this.calle.bind(_this);
          _this.mail = _this.mail.bind(_this);
          _this.cl = _this.cl.bind(_this);
          return _this;
     }

     _createClass(Client, [{
          key: "cl",
          value: function cl(event) {
               this.setState({
                    nombre: "",
                    cedula: "",
                    telefono: "",
                    ciudad: "",
                    calles: "",
                    mail: "",
                    men: ""
               });
          }
     }, {
          key: "mail",
          value: function mail(event) {
               this.setState({
                    mail: event.target.value
               });
          }
     }, {
          key: "calle",
          value: function calle(event) {
               this.setState({
                    calles: event.target.value
               });
          }
     }, {
          key: "ciu",
          value: function ciu(event) {
               this.setState({
                    ciudad: event.target.value
               });
          }
     }, {
          key: "tel",
          value: function tel(event) {
               this.setState({
                    telefono: event.target.value
               });
          }
     }, {
          key: "nom",
          value: function nom(event) {
               this.setState({
                    nombre: mayPalabras(event.target.value)
               });
          }
     }, {
          key: "ci",
          value: function ci(event) {
               this.setState({
                    cedula: event.target.value,
                    men: ""
               });
               var fil = this.props.cli.filter(function (doc) {
                    return event.target.value === doc.cedula.substr(0, event.target.value.length);
               });
               for (var i = 0; i < fil.length; i++) {
                    if (fil[i].cedula) {
                         this.setState({
                              men: "Ya existe"
                         });
                    }
               }
          }
     }, {
          key: "render",
          value: function render() {
               sumit = null;
               if (this.state.nombre === "" || this.state.cedula === "" || this.state.telefono === "" || this.state.mail === "" || !(this.state.telefono.length >= 7 && this.state.telefono.length <= 13) || !(this.state.cedula.length >= 10 && this.state.cedula.length <= 11)) {
                    sumit = React.createElement(
                         "div",
                         null,
                         React.createElement("input", { type: "submit", name: "", value: "Agregar", disabled: true }),
                         React.createElement("input", { type: "reset", name: "", value: "Limpiar Datos", onClick: this.cl })
                    );
               } else {
                    sumit = React.createElement(
                         "div",
                         null,
                         React.createElement("input", { type: "submit", name: "", value: "Agregar" }),
                         React.createElement("input", { type: "reset", name: "", value: "Limpiar Datos", onClick: this.cl })
                    );
               }
               var ac = "/newClient";
               var elem = React.createElement(
                    "div",
                    null,
                    React.createElement(
                         "form",
                         { method: "POST", action: ac },
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "label",
                                   { htmlFor: "nombre" },
                                   "Nombre:"
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "text", name: "nombre", id: "nombre", placeholder: "Nombre cliente", value: this.state.nombre, onChange: this.nom, required: true })
                         ),
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "label",
                                   { htmlFor: "cedula" },
                                   "Cedula:"
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "text", name: "cedula", id: "cedula", placeholder: "999999999-0", pattern: "[0-9]{9}-[0-9]|[0-9]{10}", value: this.state.cedula, onChange: this.ci, required: true }),
                              React.createElement(
                                   "span",
                                   null,
                                   this.state.men
                              )
                         ),
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "label",
                                   { htmlFor: "telefono" },
                                   "Telefono:"
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "text", name: "telefono", id: "telefono", placeholder: "0999999999", pattern: "[0-9]{7}|[0-9]{8}|[0-9]{9}|[0-9]{10}|[0-9]{11}|[0-9]{12}|+[0-9]{12}|[0-9]{13}", value: this.state.telefono, onChange: this.tel, required: true })
                         ),
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "label",
                                   { htmlFor: "mail" },
                                   "Correo Electronico:"
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "email", name: "mail", id: "mail", placeholder: "ejemplo@ejemplo.com", value: this.state.mail, onChange: this.mail, required: true })
                         ),
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "label",
                                   null,
                                   "Direccion:"
                              ),
                              React.createElement(
                                   "div",
                                   null,
                                   React.createElement(
                                        "label",
                                        { htmlFor: "ciudad:" },
                                        "Ciudad"
                                   ),
                                   React.createElement("input", { type: "text", name: "ciudad", id: "ciudad", placeholder: "Ciudad", value: this.state.ciudad, onChange: this.ciu })
                              ),
                              React.createElement(
                                   "div",
                                   null,
                                   React.createElement(
                                        "label",
                                        { htmlFor: "calles" },
                                        "Calles:"
                                   ),
                                   React.createElement("input", { type: "text", name: "calles", id: "calles", placeholder: "calle A, calle B", value: this.state.calles, onChange: this.calle })
                              )
                         ),
                         React.createElement("br", null),
                         sumit
                    )
               );
               return elem;
          }
     }]);

     return Client;
}(React.Component);

data = getVars('data', function (doc) {
     return doc;
});

var element = React.createElement(Client, { cli: data });

ReactDOM.render(element, document.getElementById('cli'));