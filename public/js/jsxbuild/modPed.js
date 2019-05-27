var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
     _inherits(Menu, _React$Component);

     /**
      * 
      * @param {Object} props 
      */
     function Menu(props) {
          _classCallCheck(this, Menu);

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
          var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

          _this.state = {
               menu: "",
               famId: "",
               fam: _this.props.fam,
               sfam: null,
               prod: null,
               opt: false,
               platos: true,
               observaciones: [],
               consumo: [],
               allpr: _this.props.prod

               /**
                * 
                * @type {Array<{plato: string, observaciones: string}>}
                */
          };_this.consumo = [];

          /**
           * 
           * @type {string}
           */
          _this.tempId = "";
          _this.ensal = [];
          _this.papas = [];
          _this.csm = React.createRef();
          return _this;
     }

     /**
      * 
      * @param {Object} event 
      */


     _createClass(Menu, [{
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
               var _this2 = this;

               /**
                * 
                * @type {number}
                */
               var index = this.consumo.findIndex(function (doc) {
                    return doc.observaciones === _this2.csm.current.innerText;
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
           * @returns {Object} 
           */

     }, {
          key: "render",
          value: function render() {
               var _this3 = this;

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
                                             return _this3.salAzu(event, i);
                                        }.bind(_this3) },
                                   React.createElement(
                                        "p",
                                        { ref: _this3.ensal[i] },
                                        "Ensalada/Azucar"
                                   )
                              ),
                              React.createElement(
                                   "div",
                                   { onClick: function (event) {
                                             return _this3.papasHielo(event, i);
                                        }.bind(_this3) },
                                   React.createElement(
                                        "p",
                                        { ref: _this3.papas[i] },
                                        "Papas Fritas/Hielo"
                                   )
                              ),
                              React.createElement(
                                   "div",
                                   null,
                                   React.createElement("textarea", { ref: _this3.option[i], name: "", id: "", cols: "10", rows: "2", value: _this3.state.observaciones[i], onChange: function (event) {
                                             return _this3.ovc(event, i);
                                        }.bind(_this3) })
                              )
                         ),
                         React.createElement("input", { type: "button", value: "Add", onClick: function (event) {
                                   return _this3.guardarPlato(event, i);
                              }.bind(_this3) })
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
                                        return _this3.cl(event);
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
                                        return _this3.clpr(event);
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
                                        return _this3.proSet(event);
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
                         product = _this3.state.allpr.filter(function (doc) {
                              return doc._id === _this3.state.consumo[_i3].plato;
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
                                        { ref: _this3.csm, style: { "display": "table-cell" } },
                                        React.createElement(
                                             "p",
                                             null,
                                             _this3.state.consumo[_i3].observaciones
                                        )
                                   ),
                                   React.createElement(
                                        "div",
                                        null,
                                        React.createElement("input", { type: "button", onClick: function (event) {
                                                  return _this3.delete(event);
                                             }.bind(_this3), value: "Eliminar" })
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
                         React.createElement("input", { type: "button", onClick: function (event) {
                                   return _this3.mod(event);
                              }.bind(this), value: "Modificar" })
                    ),
                    React.createElement("br", null)
               ));

               /**
                * 
                * @type {Object} 
                */
               var elem = React.createElement(
                    "div",
                    null,
                    React.createElement(
                         "div",
                         { style: { "backgroundColor": "black", "width": "70px", "color": "white", "borderRadius": "1em" }, onClick: function (event) {
                                   return _this3.atras(event);
                              }.bind(this) },
                         React.createElement(
                              "h5",
                              { style: { "fontSize": "2.5em" } },
                              "\xA0",
                              "<--"
                         )
                    ),
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
                                        return _this3.next(event);
                                   }.bind(this), value: "Verificar Orden" })
                         )
                    )
               );

               return elem;
          }
     }]);

     return Menu;
}(React.Component);

var Modificar = function (_React$Component2) {
     _inherits(Modificar, _React$Component2);

     /**
      * 
      * @param {Object} props 
      */
     function Modificar(props) {
          _classCallCheck(this, Modificar);

          /**
           * 
           * @property {*} pedido 
           * @property {Array<*>} produc 
           * @property {boolean} showMenu 
           */
          var _this4 = _possibleConstructorReturn(this, (Modificar.__proto__ || Object.getPrototypeOf(Modificar)).call(this, props));

          _this4.state = {
               pedido: props.ped,
               produc: props.produc,
               showMenu: false
          };

          _this4.menu = React.createRef();
          return _this4;
     }

     _createClass(Modificar, [{
          key: "save",
          value: function save(event) {
               var _this5 = this;

               console.log(this.menu);
               var pd = this.state.pedido;
               console.log(this.menu.current.state.consumo);
               for (var j in this.menu.current.state.consumo) {
                    if (this.menu.current.state.consumo.hasOwnProperty(j)) {
                         pd.consumo.push(this.menu.current.state.consumo[j]);
                    }
               }
               pd.precio = 0;

               var _loop2 = function _loop2(_j) {
                    if (pd.consumo.hasOwnProperty(_j)) {
                         fn = _this5.state.produc.find(function (doc) {
                              return doc._id === pd.consumo[_j].plato;
                         });

                         pd.precio += parseFloat(fn.precio.precio);
                    }
               };

               for (var _j in pd.consumo) {
                    var fn;

                    _loop2(_j);
               }
               console.log(pd);
               this.setState({
                    pedido: pd
               });
               this.menu.current.state.consumo = [];
          }

          /**
           * 
           * @param {*} event 
           */

     }, {
          key: "addMenu",
          value: function addMenu(event) {
               this.setState({
                    showMenu: true
               });
          }

          /**
           * 
           * @param {*} event 
           * @param {number} i 
           */

     }, {
          key: "elim",
          value: function elim(event, i) {
               var _this6 = this;

               var pd = this.state.pedido;
               pd.consumo.splice(i, 1);
               console.log(pd.consumo, i);
               pd.precio = 0;

               var _loop3 = function _loop3(j) {
                    if (pd.consumo.hasOwnProperty(j)) {
                         fn = _this6.state.produc.find(function (doc) {
                              return doc._id === pd.consumo[j].plato;
                         });

                         pd.precio += parseFloat(fn.precio.precio);
                    }
               };

               for (var j in pd.consumo) {
                    var fn;

                    _loop3(j);
               }
               console.log(pd.precio);
               this.setState({
                    pedido: pd
               });
          }

          /**
           * 
           * @returns {Object} 
           */

     }, {
          key: "render",
          value: function render() {
               var _this7 = this;

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
               var styElim = {
                    "border": "black 1px solid",
                    "borderCollapse": "collapse",
                    "height": "15px",
                    "wordWrap": "break-word",
                    "fontSize": "13px",
                    "padding": "1px",
                    "width": "inherit"
               };
               var styleT = {
                    "backgroundColor": "white",
                    "border": "black 1px solid",
                    "tableLayout": "fixed",
                    "width": "100%"
               };

               var frm = React.createElement(
                    "div",
                    null,
                    React.createElement("input", { type: "text", name: "pd", value: JSON.stringify(this.state.pedido), style: { "display": "none" }, readOnly: true }),
                    React.createElement("input", { type: "submit", value: "finalizar" })
               );

               /**
                * 
                * @type {Array<*>} 
                */
               var pedList = [];

               var _loop4 = function _loop4(i) {
                    if (_this7.state.pedido.consumo.hasOwnProperty(i)) {
                         fn = _this7.state.produc.find(function (doc) {
                              return doc._id === _this7.state.pedido.consumo[i].plato;
                         });

                         if (!fn) {
                              return "continue";
                         }
                         pedList.push(React.createElement(
                              "tr",
                              { key: i },
                              React.createElement(
                                   "td",
                                   { style: styles },
                                   fn.nombre
                              ),
                              React.createElement(
                                   "td",
                                   { style: styles },
                                   "$:\xA0",
                                   fn.precio.precio
                              ),
                              React.createElement(
                                   "td",
                                   { style: styElim },
                                   React.createElement("input", { type: "button", onClick: function (event, i) {
                                             return _this7.elim(event, i);
                                        }.bind(_this7), value: "Eliminar" })
                              )
                         ));
                    }
               };

               for (var i in this.state.pedido.consumo) {
                    var fn;

                    var _ret4 = _loop4(i);

                    if (_ret4 === "continue") continue;
               }
               console.log(this.state.pedido);
               pedList.push(React.createElement(
                    "tr",
                    { key: pedList.length },
                    React.createElement(
                         "td",
                         { style: styles },
                         React.createElement(
                              "strong",
                              null,
                              "Total:"
                         )
                    ),
                    React.createElement(
                         "td",
                         { style: styles },
                         React.createElement(
                              "strong",
                              null,
                              "$:\xA0",
                              this.state.pedido.precio
                         )
                    ),
                    React.createElement(
                         "td",
                         { style: styElim },
                         frm
                    )
               ));

               /**
                * 
                * @type {Object} 
                */
               var elem = React.createElement(
                    "div",
                    null,
                    React.createElement(
                         "form",
                         { action: "/edit", method: "post" },
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
                                                  "Plato:"
                                             ),
                                             React.createElement(
                                                  "th",
                                                  { style: styles },
                                                  "Precio:"
                                             ),
                                             React.createElement(
                                                  "th",
                                                  { style: styElim },
                                                  "Eliminar:"
                                             )
                                        )
                                   ),
                                   React.createElement(
                                        "tbody",
                                        null,
                                        pedList
                                   )
                              )
                         ),
                         this.state.showMenu ? React.createElement(
                              "div",
                              null,
                              React.createElement("input", { type: "button", onClick: function (event) {
                                        return _this7.save(event);
                                   }.bind(this), value: "Guardar Cambios" }),
                              React.createElement("br", null),
                              React.createElement(Menu, { ref: this.menu, ped: this.state.pedido, fam: this.props.fam, subfam: this.props.sfam, prod: this.props.produc })
                         ) : React.createElement("input", { type: "button", onClick: function (event) {
                                   return _this7.addMenu(event);
                              }.bind(this), value: "AgregarPlato" })
                    )
               );

               return elem;
          }
     }]);

     return Modificar;
}(React.Component);

/**
 * 
 * @type {string}
 */


var url = getSingle('url', function (doc) {
     return doc;
});

/**
 * 
 * @type {Object}
 */
var pedido = getVars('pedido', function (doc) {
     return doc;
});

/**
 * 
 * @type {Object}
 */
var fam = getVars('fam', function (doc) {
     return doc;
});

/**
 * 
 * @type {Object}
 */
var sfam = getVars('sfam', function (doc) {
     return doc;
});

/**
 * 
 * @type {Object}
 */
var produc = getVars('produc', function (doc) {
     return doc;
});

/**
 * @type {Object}
 */
var element = React.createElement(Modificar, { url: url, ped: pedido, fam: fam, sfam: sfam, produc: produc });

ReactDOM.render(element, document.getElementById('modify'));