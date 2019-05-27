var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Producto = function (_React$Component) {
     _inherits(Producto, _React$Component);

     function Producto(props) {
          _classCallCheck(this, Producto);

          var _this = _possibleConstructorReturn(this, (Producto.__proto__ || Object.getPrototypeOf(Producto)).call(this, props));

          _this.state = {
               nombre: "",
               fm: _this.props.fm,
               sfm: _this.props.sfm,
               selc: "",
               pre: "",
               descrip: "",
               rad: false,
               rad1: false,
               rad2: false,
               file: false,
               iva: false
          };
          _this.nom = _this.nom.bind(_this);
          _this.fm = _this.fm.bind(_this);
          _this.sfm = _this.sfm.bind(_this);
          _this.pres = _this.pres.bind(_this);
          _this.descripAct = _this.descripAct.bind(_this);
          _this.cl = _this.cl.bind(_this);
          _this.rad = _this.rad.bind(_this);
          _this.fl = _this.fl.bind(_this);
          _this.iva = _this.iva.bind(_this);
          _this.image = React.createRef();
          return _this;
     }

     _createClass(Producto, [{
          key: "iva",
          value: function iva(event) {
               this.setState({
                    iva: true
               });
          }
     }, {
          key: "fl",
          value: function fl(event) {
               if (event.target.value) {
                    this.setState({
                         file: true
                    });
               }
          }
     }, {
          key: "rad",
          value: function rad(event) {
               this.setState({
                    rad: true
               });
          }
     }, {
          key: "cl",
          value: function cl(event) {
               this.setState({
                    nombre: "",
                    selc: "",
                    pre: "",
                    descrip: "",
                    rad: false,
                    rad1: false,
                    rad2: false,
                    file: false,
                    iva: false
               });
          }
     }, {
          key: "descripAct",
          value: function descripAct(event) {
               this.setState({
                    descrip: event.target.value
               });
          }
     }, {
          key: "pres",
          value: function pres(event) {
               this.setState({
                    pre: event.target.value
               });
          }
     }, {
          key: "nom",
          value: function nom(event) {
               this.setState({
                    nombre: event.target.value
               });
          }
     }, {
          key: "fm",
          value: function fm(event) {
               this.setState({
                    selc: event.target.value,
                    rad1: true
               });
          }
     }, {
          key: "sfm",
          value: function sfm(event) {
               this.setState({
                    selc: event.target.value,
                    rad2: true
               });
          }
     }, {
          key: "render",
          value: function render() {
               selc = [];
               if (this.state.selc === "fam") {
                    selc = [];
                    for (var i = 0; i < this.state.fm.length; i++) {
                         selc[i] = React.createElement(
                              "div",
                              { key: i },
                              React.createElement("input", { type: "radio", id: this.state.fm[i].nombre, name: "sfm", value: this.state.fm[i].nombre, onClick: this.rad }),
                              React.createElement(
                                   "label",
                                   { htmlFor: this.state.fm[i].nombre },
                                   this.state.fm[i].nombre
                              )
                         );
                    }
               } else if (this.state.selc === "sfam") {
                    selc = [];
                    for (var i = 0; i < this.state.sfm.length; i++) {
                         selc[i] = React.createElement(
                              "div",
                              { key: i },
                              React.createElement("input", { type: "radio", id: this.state.sfm[i].nombre, name: "sfm", value: this.state.sfm[i].nombre, onClick: this.rad }),
                              React.createElement(
                                   "label",
                                   { htmlFor: this.state.sfm[i].nombre },
                                   this.state.sfm[i].nombre
                              )
                         );
                    }
               } else {
                    selc = [];
               }
               sumit = null;
               if (this.state.nombre === "" || this.state.selc === "" || this.state.pre === "" || this.state.descrip === "" || !this.state.rad || !this.state.rad1 || !this.state.file) {
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

               var ac = "/newProduct";
               var elem = React.createElement(
                    "div",
                    null,
                    React.createElement(
                         "form",
                         { method: "POST", action: ac, encType: "multipart/form-data" },
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "label",
                                   { htmlFor: "nombre" },
                                   React.createElement(
                                        "strong",
                                        null,
                                        "Nombre del Producto:"
                                   )
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "text", name: "nombre", id: "nombre", placeholder: "Producto", value: this.state.nombre, onChange: this.nom, required: true })
                         ),
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "span",
                                   null,
                                   React.createElement(
                                        "strong",
                                        null,
                                        "Ludar de preparacion:"
                                   )
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "checkbox", id: "bar", name: "lugar", value: "ba", onClick: this.sfm }),
                              React.createElement(
                                   "label",
                                   { htmlFor: "bar" },
                                   "Bar"
                              ),
                              React.createElement("input", { type: "checkbox", id: "par", name: "lugar", value: "pa", onClick: this.sfm }),
                              React.createElement(
                                   "label",
                                   { htmlFor: "par" },
                                   "Parrilla"
                              ),
                              React.createElement("input", { type: "checkbox", id: "coc", name: "lugar", value: "co", onClick: this.sfm }),
                              React.createElement(
                                   "label",
                                   { htmlFor: "coc" },
                                   "Cocina"
                              )
                         ),
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "label",
                                   null,
                                   React.createElement(
                                        "strong",
                                        null,
                                        "Pertenece a:"
                                   )
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "radio", id: "fam", name: "fm", value: "fam", onClick: this.fm }),
                              React.createElement(
                                   "label",
                                   { htmlFor: "fam" },
                                   "Familia"
                              ),
                              React.createElement("input", { type: "radio", id: "sfam", name: "fm", value: "sfam", onClick: this.fm }),
                              React.createElement(
                                   "label",
                                   { htmlFor: "sfam" },
                                   "Subfamilia"
                              ),
                              React.createElement(
                                   "div",
                                   null,
                                   selc
                              )
                         ),
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "label",
                                   { htmlFor: "precio" },
                                   React.createElement(
                                        "strong",
                                        null,
                                        "Precio:"
                                   )
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "radio", id: "iva", name: "iva", value: true, onClick: this.iva }),
                              React.createElement(
                                   "label",
                                   { htmlFor: "iva" },
                                   "Incluye IVA"
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "text", name: "precio", id: "precio", placeholder: "Precio", value: this.state.pre, onChange: this.pres, pattern: "[0-9]{2}|[0-9]|[0-9]{2}.[0-9]{2}|[0-9].[0-9]|[0-9].[0-9]{2}|[0-9]{2}.[0-9]", required: true }),
                              React.createElement(
                                   "span",
                                   null,
                                   "(.) para separar decimales"
                              )
                         ),
                         React.createElement(
                              "div",
                              null,
                              React.createElement("input", { type: "file", name: "image", id: "image", placeholder: "Familia", ref: this.image, accept: "image/*", onChange: this.fl, required: true })
                         ),
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "label",
                                   { htmlFor: "descrip" },
                                   React.createElement(
                                        "strong",
                                        null,
                                        "Descripcion de la Familia: "
                                   )
                              ),
                              React.createElement("br", null),
                              React.createElement("textarea", { name: "descrip", rows: "4", cols: "39", placeholder: "Descripcion general", value: this.state.descrip, onChange: this.descripAct, required: true })
                         ),
                         React.createElement("br", null),
                         sumit
                    )
               );
               return elem;
          }
     }]);

     return Producto;
}(React.Component);

data = getVars('fm', function (doc) {
     return doc;
});
data1 = getVars('sfm', function (doc) {
     return doc;
});

var element = React.createElement(Producto, { fm: data, sfm: data1 });

ReactDOM.render(element, document.getElementById('prod'));