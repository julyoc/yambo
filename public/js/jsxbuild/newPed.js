var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CiInput = function (_React$Component) {
     _inherits(CiInput, _React$Component);

     /**
      * 
      * @param {Object} props 
      */
     function CiInput(props) {
          _classCallCheck(this, CiInput);

          /**
           * 
           * @property {Array<string>} client
           * @property {Object} ptt
           * @property {string} cedula
           * @property {string} mesa
           */
          var _this = _possibleConstructorReturn(this, (CiInput.__proto__ || Object.getPrototypeOf(CiInput)).call(this, props));

          _this.state = {
               client: _this.props.cli,
               cedula: getParameterByName("ci"),
               ptt: {},
               mesa: ""
          };
          if (getParameterByName("ci") != "") {
               /**
                * 
                * @type {*}
                */
               var std = _this.props.cli.filter(function (doc) {
                    return doc.cedula === getParameterByName("ci");
               });
               if (std[0]) {
                    _this.state = {
                         client: _this.props.cli,
                         cedula: getParameterByName("ci"),
                         ptt: std[0],
                         mesa: ""
                    };
               }
          }
          _this.ci = _this.ci.bind(_this);
          _this.cli = _this.cli.bind(_this);
          _this.mesa = _this.mesa.bind(_this);
          console.log("ingresar cedula");
          return _this;
     }

     /**
      * 
      * @param {Object} event
      */


     _createClass(CiInput, [{
          key: "mesa",
          value: function mesa(event) {
               this.setState({
                    mesa: event.target.value
               });
          }

          /**
           * 
           * @param {Object} event 
           */

     }, {
          key: "cli",
          value: function cli(event) {
               this.setState({
                    cedula: this.state.ptt.cedula
               });
          }

          /**
           * 
           * @param {Object} event 
           */

     }, {
          key: "ci",
          value: function ci(event) {
               /**
                * 
                * @type {*}
                */
               var std = this.state.client.filter(function (doc) {
                    return doc.cedula.substr(0, event.target.value.length) === event.target.value;
               });
               if (std[0]) {
                    this.setState({
                         cedula: event.target.value,
                         ptt: std[0]
                    });
               } else {
                    this.setState({
                         cedula: event.target.value,
                         ptt: { nombre: "No encontrado", cedula: event.target.value }
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
               /**
                * 
                * @type {Object}
                */
               var elem = React.createElement(
                    "div",
                    null,
                    React.createElement(
                         "label",
                         { htmlFor: "cedula" },
                         React.createElement(
                              "strong",
                              null,
                              "Ingrese el numero de cedula:"
                         )
                    ),
                    React.createElement("br", null),
                    React.createElement("input", { type: "text", name: "cedula", id: "cedula", pattern: "[0-9]{9}-[0-9]|[0-9]{10}", value: this.state.cedula, onChange: this.ci, required: true }),
                    React.createElement(
                         "span",
                         { onClick: this.cli },
                         " " + this.state.ptt.nombre + ": " + this.state.ptt.cedula
                    ),
                    React.createElement("br", null),
                    React.createElement(
                         "label",
                         { htmlFor: "mesa" },
                         "Mesa #:"
                    ),
                    React.createElement("input", { type: "text", name: "mesa", id: "mesa", value: this.state.mesa, onChange: this.mesa, required: true })
               );
               return elem;
          }
     }]);

     return CiInput;
}(React.Component);

var Pedido = function (_React$Component2) {
     _inherits(Pedido, _React$Component2);

     /**
      * 
      * @param {Object} props 
      */
     function Pedido(props) {
          _classCallCheck(this, Pedido);

          /**
           * 
           * @property {string} menu
           * @property {string} famId
           * @property {Array<*>} fam
           * @property {*} sfam
           * @property {*} prod
           * @property {boolean} opt
           * @property {boolean} platos
           * @property {Array<string>} observaciones
           * @property {Array<{plato: string, observaciones: string}>} consumo
           */
          var _this2 = _possibleConstructorReturn(this, (Pedido.__proto__ || Object.getPrototypeOf(Pedido)).call(this, props));

          _this2.state = {
               menu: "",
               famId: "",
               fam: _this2.props.fam,
               sfam: null,
               prod: null,
               opt: false,
               platos: true,
               observaciones: [],
               consumo: [],
               allpr: _this2.props.prod

               /**
                * 
                * @type {Array<{plato: string, observaciones: string}>}
                */
          };_this2.consumo = [];

          /**
           * 
           * @type {string}
           */
          _this2.tempId = "";
          _this2.ensal = [];
          _this2.papas = [];
          _this2.csm = React.createRef();
          return _this2;
     }

     /**
      * 
      * @param {Object} event 
      */


     _createClass(Pedido, [{
          key: "atras",
          value: function atras(event) {
               if (this.state.menu === "sf") {
                    this.setState({
                         menu: "",
                         sfam: null
                    });
               } else if (this.state.menu === "pro" && this.state.sfam) {
                    this.setState({
                         menu: "sf"
                    });
               } else if (this.state.menu === "pro") {
                    this.setState({
                         menu: "",
                         sfam: null
                    });
               }
          }

          /**
           * 
           * @param {Object} event 
           */

     }, {
          key: "mod",
          value: function mod(event) {
               this.setState({
                    menu: ""
               });
          }

          /**
           * 
           * @param {*} event 
           */

     }, {
          key: "next",
          value: function next(event) {
               this.setState({
                    menu: "final"
               });
          }

          /**
           * 
           * @param {*} event 
           */

     }, {
          key: "delete",
          value: function _delete(event) {
               var _this3 = this;

               /**
                * 
                * @type {number}
                */
               var index = this.consumo.findIndex(function (doc) {
                    return doc.observaciones === _this3.csm.current.innerText;
               });

               this.consumo.splice(index, 1);
               this.setState({
                    consumo: this.consumo
               });
          }

          /**
           * 
           * @param {Object} event 
           */

     }, {
          key: "papasHielo",
          value: function papasHielo(event, i) {
               console.log(i);
               console.log(this.ensal);
               console.log(this.papas);
               if (this.papas[i].current.innerText === "Papas Cocinadas/Sin Hielo") {
                    this.papas[i].current.innerText = "Papas Fritas/Hielo";
               } else {
                    this.papas[i].current.innerText = "Papas Cocinadas/Sin Hielo";
               }
          }

          /**
           * 
           * @param {Object} event 
           */

     }, {
          key: "salAzu",
          value: function salAzu(event, i) {
               console.log(i);
               console.log(this.ensal);
               console.log(this.papas);
               if (this.ensal[i].current.innerText === "Sin Ensalada/Sin Azucar") {
                    this.ensal[i].current.innerText = "Ensalada/Azucar";
               } else {
                    this.ensal[i].current.innerText = "Sin Ensalada/Sin Azucar";
               }
          }

          /**
           * 
           * @param {Object} event 
           */

     }, {
          key: "ovc",
          value: function ovc(event, i) {
               var tmp = [];
               tmp[i] = this.option[i].current.value;
               this.setState({
                    observaciones: tmp
               });
          }

          /**
           * 
           * @param {Object} event 
           */

     }, {
          key: "guardarPlato",
          value: function guardarPlato(event, i) {
               this.consumo.push({
                    plato: this.tempId,
                    observaciones: this.ensal[i].current.innerText + "  \n  " + this.papas[i].current.innerText + "  \n  " + this.option[i].current.value
               });
               this.setState({
                    consumo: this.consumo,
                    menu: "",
                    famId: "",
                    sfam: null,
                    prod: null,
                    opt: false,
                    platos: true,
                    observaciones: ""
               });
          }

          /**
           * 
           * @param {Object} event 
           */

     }, {
          key: "proSet",
          value: function proSet(event) {
               this.setState({
                    opt: true
               });
               this.tempId = event.target.value;
          }

          /**
           * 
           * @param {Object} event 
           */

     }, {
          key: "clpr",
          value: function clpr(event) {
               /**
                * 
                * @type {*}
                */
               var pr = this.props.prod.filter(function (doc) {
                    return doc.familyid === event.target.value;
               });
               for (var i = 0; i < pr.length; i++) {
                    this.ensal.push(React.createRef());
                    this.papas.push(React.createRef());
                    this.option.push(React.createRef());
               }
               this.setState({
                    menu: "pro",
                    prod: pr,
                    famId: event.target.value
               });
          }

          /**
           * 
           * @param {Object} event 
           */

     }, {
          key: "cl",
          value: function cl(event) {
               /**
                * 
                * @type {*}
                */
               var std = this.props.subfam.filter(function (doc) {
                    return doc.familyid === event.target.value;
               });
               this.ensal = [];
               this.papas = [];
               this.option = [];
               if (std[0]) {
                    this.setState({
                         menu: "sf",
                         sfam: std,
                         famId: event.target.value
                    });
               } else {

                    /**
                     * 
                     * @type {*}
                     */
                    var pr = this.props.prod.filter(function (doc) {
                         return doc.familyid === event.target.value;
                    });
                    for (var i = 0; i < pr.length; i++) {
                         this.ensal.push(React.createRef());
                         this.papas.push(React.createRef());
                         this.option.push(React.createRef());
                    }
                    this.setState({
                         menu: "pro",
                         prod: pr,
                         famId: event.target.value
                    });
               }
          }

          /**
           * 
           */

     }, {
          key: "render",
          value: function render() {
               var _this4 = this;

               /**
                * 
                * @type {Object}
                */
               var opciones = function opciones(i) {
                    return React.createElement(
                         "div",
                         null,
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "div",
                                   { onClick: function (event) {
                                             return _this4.salAzu(event, i);
                                        }.bind(_this4) },
                                   React.createElement(
                                        "p",
                                        { ref: _this4.ensal[i] },
                                        "Ensalada/Azucar"
                                   )
                              ),
                              React.createElement(
                                   "div",
                                   { onClick: function (event) {
                                             return _this4.papasHielo(event, i);
                                        }.bind(_this4) },
                                   React.createElement(
                                        "p",
                                        { ref: _this4.papas[i] },
                                        "Papas Fritas/Hielo"
                                   )
                              ),
                              React.createElement(
                                   "div",
                                   null,
                                   React.createElement("textarea", { ref: _this4.option[i], name: "", id: "", cols: "10", rows: "2", value: _this4.state.observaciones[i], onChange: function (event) {
                                             return _this4.ovc(event, i);
                                        }.bind(_this4) })
                              )
                         ),
                         React.createElement("input", { type: "button", value: "Add", onClick: function (event) {
                                   return _this4.guardarPlato(event, i);
                              }.bind(_this4) })
                    );
               };

               /**
                * 
                * @type {Array<Object>}
                */
               var stl = [{
                    "width": "1em",
                    "display": "table-cell"
               }, {
                    "backgroundColor": "rgb(6, 23, 10)",
                    "width": "13em",
                    "height": "11em",
                    "fontSize": "17px",
                    "color": "white",
                    "borderRadius": "1em",
                    "display": "table-cell",
                    "textAlign": "center",
                    "justifyContent": "center",
                    "alignItems": "center",
                    "paddingTop": "15px"
               }, {
                    "width": "6em",
                    "height": "6em"
               }];

               /**
                * 
                * @type {Array<*>}
                */
               var arrFam = [];
               if (this.state.fam) {
                    var i = 0;
                    while (i < 2 * this.state.fam.length) {
                         arrFam[i] = React.createElement(
                              "div",
                              { key: i, style: stl[1] },
                              React.createElement("input", { type: "checkbox", name: "fami", id: this.state.fam[i / 2].nombre, value: this.state.fam[i / 2]._id, onClick: function (event) {
                                        return _this4.cl(event);
                                   }.bind(this), style: { display: "none" } }),
                              React.createElement(
                                   "label",
                                   { htmlFor: this.state.fam[i / 2].nombre },
                                   React.createElement(
                                        "div",
                                        null,
                                        React.createElement("img", { src: "/" + this.state.fam[i / 2].imagen, alt: "family", style: stl[2] }),
                                        React.createElement(
                                             "h5",
                                             null,
                                             this.state.fam[i / 2].nombre
                                        )
                                   ),
                                   React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                             "p",
                                             null,
                                             this.state.fam[i / 2].descripcion
                                        )
                                   )
                              )
                         );
                         i++;
                         if (i === 5 || i === 11 || i === 17 || i === 23 || i === 29) {
                              arrFam[i] = React.createElement(
                                   "div",
                                   { key: i },
                                   React.createElement("br", null)
                              );
                         } else {
                              arrFam[i] = React.createElement("div", { key: i, style: stl[0] });
                         }
                         i++;
                    }
               }

               /**
                * 
                * @type {Array<*>}
                */
               var arrSubfam = [];
               if (this.state.sfam) {
                    var _i = 0;
                    while (_i < 2 * this.state.sfam.length) {
                         arrSubfam[_i] = React.createElement(
                              "div",
                              { key: _i, style: stl[1] },
                              React.createElement("input", { type: "checkbox", name: "sfami", id: this.state.sfam[_i / 2].nombre, value: this.state.sfam[_i / 2]._id, onClick: function (event) {
                                        return _this4.clpr(event);
                                   }.bind(this), style: { display: "none" } }),
                              React.createElement(
                                   "label",
                                   { htmlFor: this.state.sfam[_i / 2].nombre },
                                   React.createElement(
                                        "div",
                                        null,
                                        React.createElement("img", { src: "/" + this.state.sfam[_i / 2].imagen, alt: "family", style: stl[2] }),
                                        React.createElement(
                                             "h5",
                                             null,
                                             this.state.sfam[_i / 2].nombre
                                        )
                                   ),
                                   React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                             "p",
                                             null,
                                             this.state.sfam[_i / 2].descripcion
                                        )
                                   )
                              )
                         );
                         _i++;
                         if (_i === 5 || _i === 11 || _i === 17 || _i === 23 || _i === 29) {
                              arrSubfam[_i] = React.createElement(
                                   "div",
                                   { key: _i },
                                   React.createElement("br", null)
                              );
                         } else {
                              arrSubfam[_i] = React.createElement("div", { key: _i, style: stl[0] });
                         }
                         _i++;
                    }
               }

               /**
                * 
                * @type {Array<*>}
                */
               var arrPruduc = [];
               if (this.state.prod) {
                    var _i2 = 0;
                    while (_i2 < 2 * this.state.prod.length) {
                         arrPruduc[_i2] = React.createElement(
                              "div",
                              { key: _i2, style: stl[1] },
                              React.createElement("input", { type: "checkbox", name: "consumo", id: this.state.prod[_i2 / 2].nombre, value: this.state.prod[_i2 / 2]._id, style: { display: "none" }, onClick: function (event) {
                                        return _this4.proSet(event);
                                   }.bind(this) }),
                              React.createElement(
                                   "label",
                                   { htmlFor: this.state.prod[_i2 / 2].nombre },
                                   React.createElement(
                                        "div",
                                        null,
                                        React.createElement("img", { src: '/' + this.state.prod[_i2 / 2].imagen, alt: "Producto", style: stl[2] }),
                                        React.createElement(
                                             "h5",
                                             null,
                                             this.state.prod[_i2 / 2].nombre
                                        )
                                   ),
                                   React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                             "h6",
                                             null,
                                             "$: " + this.state.prod[_i2 / 2].precio.precio
                                        ),
                                        React.createElement(
                                             "p",
                                             null,
                                             this.state.prod[_i2 / 2].descripcion
                                        )
                                   )
                              ),
                              this.state.opt ? opciones(_i2 / 2) : null
                         );
                         _i2++;
                         if (_i2 === 5 || _i2 === 11 || _i2 === 17 || _i2 === 23 || _i2 === 29) {
                              arrPruduc[_i2] = React.createElement(
                                   "div",
                                   { key: _i2 },
                                   React.createElement("br", null)
                              );
                         } else {
                              arrPruduc[_i2] = React.createElement("div", { key: _i2, style: stl[0] });
                         }
                         _i2++;
                    }
               }

               /**
                * 
                * @type {Array<*>}
                */
               var final = [];
               if (this.consumo[0]) {
                    var _loop = function _loop(_i3) {
                         product = _this4.state.allpr.filter(function (doc) {
                              return doc._id === _this4.state.consumo[_i3].plato;
                         });

                         if (product[0]) {
                              final[_i3] = React.createElement(
                                   "div",
                                   { key: _i3 },
                                   React.createElement(
                                        "div",
                                        { style: { "display": "table-cell" } },
                                        React.createElement(
                                             "p",
                                             null,
                                             React.createElement(
                                                  "strong",
                                                  null,
                                                  product[0].nombre + ":"
                                             )
                                        )
                                   ),
                                   React.createElement(
                                        "div",
                                        { ref: _this4.csm, style: { "display": "table-cell" } },
                                        React.createElement(
                                             "p",
                                             null,
                                             _this4.state.consumo[_i3].observaciones
                                        )
                                   ),
                                   React.createElement(
                                        "div",
                                        null,
                                        React.createElement("input", { type: "button", onClick: function (event) {
                                                  return _this4.delete(event);
                                             }.bind(_this4), value: "Eliminar" })
                                   )
                              );
                         }
                    };

                    for (var _i3 = 0; _i3 < this.state.consumo.length; _i3++) {
                         var product;

                         _loop(_i3);
                    }
               }
               final.push(React.createElement(
                    "div",
                    { key: final.length },
                    React.createElement("br", null)
               ));
               final.push(React.createElement(
                    "div",
                    { key: final.length },
                    React.createElement(
                         "div",
                         { style: { "display": "table-cell" } },
                         React.createElement("input", { type: "submit", value: "Finalizar" })
                    ),
                    React.createElement(
                         "div",
                         { style: { "display": "table-cell" } },
                         React.createElement("input", { type: "button", onClick: function (event) {
                                   return _this4.mod(event);
                              }.bind(this), value: "Modificar" })
                    ),
                    React.createElement("br", null)
               ));

               /**
                * 
                * @type {string}
                */
               var ac = "/nuevo-pedido";

               /**
                * 
                * @type {Object}
                */
               var elem = React.createElement(
                    "div",
                    null,
                    React.createElement(
                         "form",
                         { action: ac, method: "post" },
                         React.createElement(
                              "div",
                              { style: { "backgroundColor": "black", "width": "70px", "color": "white", "borderRadius": "1em" }, onClick: function (event) {
                                        return _this4.atras(event);
                                   }.bind(this) },
                              React.createElement(
                                   "h5",
                                   { style: { "fontSize": "2.5em" } },
                                   "\xA0",
                                   "<--"
                              )
                         ),
                         React.createElement(CiInput, { cli: this.props.cli }),
                         React.createElement("br", null),
                         React.createElement(
                              "div",
                              null,
                              React.createElement(
                                   "h5",
                                   null,
                                   React.createElement(
                                        "strong",
                                        null,
                                        "Menu:"
                                   )
                              ),
                              React.createElement("br", null),
                              this.state.menu === "" ? arrFam : null,
                              this.state.menu === "sf" ? arrSubfam : null,
                              this.state.menu === "pro" ? arrPruduc : null,
                              this.state.menu === "final" ? final : React.createElement(
                                   "div",
                                   null,
                                   React.createElement("br", null),
                                   React.createElement("input", { type: "button", onClick: function (event) {
                                             return _this4.next(event);
                                        }.bind(this), value: "Verificar Orden" })
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "text", name: "consumo", id: "", style: { "display": "none" }, value: JSON.stringify(this.state.consumo), readOnly: true })
                         )
                    ),
                    React.createElement("br", null)
               );
               return elem;
          }
     }]);

     return Pedido;
}(React.Component);

/**
 * 
 * @type {Array<*>}
 */


data = getVars('fam', function (doc) {
     return doc;
});

/**
 * 
 * @type {Array<*>}
 */
data1 = getVars('subfam', function (doc) {
     return doc;
});

/**
 * 
 * @type {Array<*>}
 */
data2 = getVars('prod', function (doc) {
     return doc;
});

/**
 * 
 * @type {Array<*>}
 */
data3 = getVars('cli', function (doc) {
     return doc;
});

/**
 * 
 * @type {Pedido}
 */
var element = React.createElement(Pedido, { fam: data, subfam: data1, prod: data2, cli: data3 });

ReactDOM.render(element, document.getElementById('ped'));