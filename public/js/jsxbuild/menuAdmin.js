var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Adm = function (_React$Component) {
     _inherits(Adm, _React$Component);

     function Adm(props) {
          _classCallCheck(this, Adm);

          var _this = _possibleConstructorReturn(this, (Adm.__proto__ || Object.getPrototypeOf(Adm)).call(this, props));

          _this.state = {
               "url": _this.props.url,
               "root": _this.props.root
          };
          _this.famfunc = _this.famfunc.bind(_this);
          _this.subf = _this.subf.bind(_this);
          _this.platofunc = _this.platofunc.bind(_this);
          _this.clifunc = _this.clifunc.bind(_this);
          _this.pedfunc = _this.pedfunc.bind(_this);
          return _this;
     }

     _createClass(Adm, [{
          key: "famfunc",
          value: function famfunc(event) {
               /**
                * @type {string}
                */
               var url = window.location + "/famAdd";
               window.location.replace(url);
               console.log(url);
          }
     }, {
          key: "subf",
          value: function subf(event) {
               /**
                * @type {string}
                */
               var url = window.location + "/sub-famAdd";
               window.location.replace(url);
               console.log(url);
          }
     }, {
          key: "platofunc",
          value: function platofunc(event) {
               /**
                * @type {string}
                */
               var url = window.location + "/prodAdd";
               window.location.replace(url);
               console.log(url);
          }
     }, {
          key: "clifunc",
          value: function clifunc(event) {
               /**
                * @type {string}
                */
               var url = window.location + "/cliAdd";
               window.location.replace(url);
               console.log(url);
          }
     }, {
          key: "pedfunc",
          value: function pedfunc(event) {
               /**
                * @type {string}
                */
               var url = window.location + "/nuevo-pedido";
               window.location.replace(url);
               console.log(url);
          }
     }, {
          key: "editFam",
          value: function editFam(event) {
               /**
                * @type {string}
                */
               var url = window.location + "/editFam";
               window.location.replace(url);
               console.log(url);
          }
     }, {
          key: "editSubFam",
          value: function editSubFam(event) {
               /**
                * @type {string}
                */
               var url = window.location + "/editSubFam";
               window.location.replace(url);
               console.log(url);
          }
     }, {
          key: "editPlato",
          value: function editPlato(event) {
               /**
                * @type {string}
                */
               var url = window.location + "/editPlato";
               window.location.replace(url);
               console.log(url);
          }
     }, {
          key: "render",
          value: function render() {
               var _this2 = this;

               var styles = {
                    "backgroundColor": "rgb(6, 23, 10)",
                    "width": "120px",
                    "height": "60px",
                    "fontSize": "17px",
                    "color": "white",
                    "borderRadius": "90px",
                    "display": "table-cell",
                    "textAlign": "center",
                    "justifyContent": "center",
                    "alignItems": "center",
                    "paddingTop": "15px"
               };
               var s1 = {
                    "width": "100%"
               };
               var dv = {
                    "width": "3em",
                    "display": "table-cell"
               };
               var rootpar = React.createElement(
                    "div",
                    { key: 1 },
                    React.createElement(
                         "div",
                         { style: styles, onClick: this.famfunc },
                         React.createElement(
                              "p",
                              null,
                              "Agregar Nueva Familia"
                         )
                    ),
                    React.createElement("div", { style: dv }),
                    React.createElement(
                         "div",
                         { style: styles, onClick: this.subf },
                         React.createElement(
                              "p",
                              null,
                              "Agregar Nueva Sub-familia"
                         )
                    ),
                    React.createElement("div", { style: dv }),
                    React.createElement(
                         "div",
                         { style: styles, onClick: this.platofunc },
                         React.createElement(
                              "p",
                              null,
                              "Agragar Nuevo Plato"
                         )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                         "div",
                         { style: styles, onClick: function (event) {
                                   return _this2.editFam(event);
                              }.bind(this) },
                         React.createElement(
                              "p",
                              null,
                              "Editar ",
                              React.createElement("br", null),
                              " Familia"
                         )
                    ),
                    React.createElement("div", { style: dv }),
                    React.createElement(
                         "div",
                         { style: styles, onClick: function (event) {
                                   return _this2.editSubFam(event);
                              }.bind(this) },
                         React.createElement(
                              "p",
                              null,
                              "Editar ",
                              React.createElement("br", null),
                              " Sub-familia"
                         )
                    ),
                    React.createElement("div", { style: dv }),
                    React.createElement(
                         "div",
                         { style: styles, onClick: function (event) {
                                   return _this2.editPlato(event);
                              }.bind(this) },
                         React.createElement(
                              "p",
                              null,
                              "Editar ",
                              React.createElement("br", null),
                              " Plato"
                         )
                    )
               );
               var elem = React.createElement(
                    "div",
                    { style: s1 },
                    React.createElement(
                         "div",
                         { style: styles, onClick: this.clifunc },
                         React.createElement(
                              "p",
                              null,
                              "Agregar Nuevo Cliente"
                         )
                    ),
                    React.createElement("div", { style: dv }),
                    React.createElement(
                         "div",
                         { style: styles, onClick: this.pedfunc },
                         React.createElement(
                              "p",
                              null,
                              "Agregar Nuevo Pedido"
                         )
                    ),
                    React.createElement("br", null),
                    this.state.root ? rootpar : null
               );
               return elem;
          }
     }]);

     return Adm;
}(React.Component);

url = getSingle('url', function (doc) {
     return doc;
});
root = getSingle('conf', function (doc) {
     return doc;
});

var element = React.createElement(Adm, { url: url, root: root });

ReactDOM.render(element, document.getElementById('adm'));