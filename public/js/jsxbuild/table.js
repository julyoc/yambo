var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListTable = function (_React$Component) {
     _inherits(ListTable, _React$Component);

     function ListTable(props) {
          _classCallCheck(this, ListTable);

          var _this = _possibleConstructorReturn(this, (ListTable.__proto__ || Object.getPrototypeOf(ListTable)).call(this, props));

          _this.findclick = _this.findclick.bind(_this);
          _this.redic = _this.redic.bind(_this);
          _this.ordNombre = _this.ordNombre.bind(_this);
          _this.ordCedula = _this.ordCedula.bind(_this);
          _this.ordtel = _this.ordtel.bind(_this);
          _this.orddir = _this.orddir.bind(_this);
          _this.rednew = _this.rednew.bind(_this);
          _this.url = _this.props.url;
          _this.props.dates.sort(function (a, b) {
               if (a.nombre > b.nombre) {
                    return 1;
               }
               if (a.nombre < b.nombre) {
                    return -1;
               }
               return 0;
          });
          _this.state = {
               dat: _this.props.dates
          };
          return _this;
     }

     _createClass(ListTable, [{
          key: "ordNombre",
          value: function ordNombre(event) {
               this.props.dates.sort(function (a, b) {
                    if (a.nombre > b.nombre) {
                         return 1;
                    }
                    if (a.nombre < b.nombre) {
                         return -1;
                    }
                    return 0;
               });
               this.setState({
                    dat: this.props.dates
               });
          }
     }, {
          key: "ordCedula",
          value: function ordCedula(event) {
               this.props.dates.sort(function (a, b) {
                    if (a.cedula > b.cedula) {
                         return 1;
                    }
                    if (a.cedula < b.cedula) {
                         return -1;
                    }
                    return 0;
               });
               this.setState({
                    dat: this.props.dates
               });
          }
     }, {
          key: "ordtel",
          value: function ordtel(event) {
               this.props.dates.sort(function (a, b) {
                    if (a.telefono > b.telefono) {
                         return 1;
                    }
                    if (a.telefono < b.telefono) {
                         return -1;
                    }
                    return 0;
               });
               this.setState({
                    dat: this.props.dates
               });
          }
     }, {
          key: "orddir",
          value: function orddir(event) {
               this.props.dates.sort(function (a, b) {
                    if (a.direccion.ciudad > b.direccion.ciudad) {
                         return 1;
                    }
                    if (a.direccion.ciudad < b.direccion.ciudad) {
                         return -1;
                    }
                    return 0;
               });
               this.setState({
                    dat: this.props.dates
               });
          }
     }, {
          key: "redic",
          value: function redic(event) {
               var cedula = event.target.innerText;
               var url = "https://" + window.location.host + "/" + this.url + "/admin/nuevo-pedido?ci=" + cedula;
               window.location.replace(url);
          }
     }, {
          key: "findclick",
          value: function findclick(event) {
               var temp = MaysPrimera(event.target.value.toLowerCase());
               console.log(temp);
               var arr = this.props.dates.filter(function (doc) {
                    return temp === doc.nombre.substr(0, temp.length) || temp === doc.cedula.substr(0, temp.length);
               });
               console.log(arr);
               this.setState({ dat: arr });
          }
     }, {
          key: "rednew",
          value: function rednew(event) {
               var url = window.location + "/cliAdd";
               window.location.replace(url);
               console.log(url);
          }
     }, {
          key: "render",
          value: function render() {
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
               var st = {
                    "height": "15em",
                    "width": "100%",
                    "overflowY": "scroll"
               };
               var et = [];
               var i = 0;
               for (var x in this.state.dat) {
                    et[i] = React.createElement(
                         "tr",
                         { key: i.toString() },
                         React.createElement(
                              "td",
                              { style: styles },
                              this.state.dat[x].nombre
                         ),
                         React.createElement(
                              "td",
                              { style: styles, onClick: this.redic },
                              this.state.dat[x].cedula
                         ),
                         React.createElement(
                              "td",
                              { style: styles },
                              this.state.dat[x].direccion.ciudad + ": " + this.state.dat[x].direccion.calles
                         ),
                         React.createElement(
                              "td",
                              { style: styles },
                              this.state.dat[x].telefono
                         )
                    );
                    i = i + 1;
               }
               var elem = React.createElement(
                    "div",
                    null,
                    React.createElement(
                         "div",
                         null,
                         React.createElement("input", { type: "text", size: "20", onChange: this.findclick }),
                         React.createElement(
                              "button",
                              { type: "button", onClick: this.rednew },
                              "Nuevo"
                         )
                    ),
                    React.createElement("br", null),
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
                                             { style: styles, onClick: this.ordNombre },
                                             "Nombre"
                                        ),
                                        React.createElement(
                                             "th",
                                             { style: styles, onClick: this.ordCedula },
                                             "Cedula"
                                        ),
                                        React.createElement(
                                             "th",
                                             { style: styles, onClick: this.orddir },
                                             "Direccion"
                                        ),
                                        React.createElement(
                                             "th",
                                             { style: styles, onClick: this.ordtel },
                                             "Telefono"
                                        )
                                   )
                              ),
                              React.createElement(
                                   "tbody",
                                   null,
                                   et
                              )
                         )
                    ),
                    React.createElement(
                         "span",
                         null,
                         "Click en la cedula para realizar Pedido"
                    )
               );
               return elem;
          }
     }]);

     return ListTable;
}(React.Component);

url = getSingle('url', function (doc) {
     return doc;
});

data = getVars('tb', function (doc) {
     return doc;
});

var element = React.createElement(ListTable, { dates: data, url: url });

ReactDOM.render(element, document.getElementById('table'));