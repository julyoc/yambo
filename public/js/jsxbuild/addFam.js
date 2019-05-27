var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Family = function (_React$Component) {
     _inherits(Family, _React$Component);

     function Family(props) {
          _classCallCheck(this, Family);

          var _this = _possibleConstructorReturn(this, (Family.__proto__ || Object.getPrototypeOf(Family)).call(this, props));

          _this.famiAct = _this.famiAct.bind(_this);
          _this.descripAct = _this.descripAct.bind(_this);
          _this.cl = _this.cl.bind(_this);
          _this.fl = _this.fl.bind(_this);
          _this.state = {
               fami: "",
               descrip: "",
               file: false
          };
          _this.image = React.createRef();
          return _this;
     }

     _createClass(Family, [{
          key: "fl",
          value: function fl(event) {
               if (event.target.value) {
                    this.setState({
                         file: true
                    });
               }
          }
     }, {
          key: "cl",
          value: function cl(event) {
               this.setState({
                    fami: "",
                    descrip: "",
                    file: false
               });
          }
     }, {
          key: "famiAct",
          value: function famiAct(event) {
               this.setState({
                    fami: event.target.value
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
          key: "render",
          value: function render() {
               var ac = "/addfamily";
               sumit = null;
               if (this.state.fami === "" || this.state.descrip === "" || !this.state.file) {
                    sumit = React.createElement(
                         "div",
                         null,
                         React.createElement("input", { type: "submit", name: "", value: "Crear Familia", disabled: true }),
                         React.createElement("input", { type: "reset", name: "", value: "Limpiar Datos", onClick: this.cl })
                    );
               } else {
                    sumit = React.createElement(
                         "div",
                         null,
                         React.createElement("input", { type: "submit", name: "", value: "Crear Familia" }),
                         React.createElement("input", { type: "reset", name: "", value: "Limpiar Datos", onClick: this.cl })
                    );
               }
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
                                   { htmlFor: "fami" },
                                   React.createElement(
                                        "strong",
                                        null,
                                        "Nombre de la Familia: "
                                   )
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "text", name: "fami", id: "fami", placeholder: "Familia", value: this.state.fami, onChange: this.famiAct, required: true })
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
                         React.createElement(
                              "div",
                              null,
                              React.createElement("input", { type: "file", name: "image", id: "image", placeholder: "Familia", ref: this.image, accept: "image/*", onChange: this.fl, required: true })
                         ),
                         React.createElement("br", null),
                         sumit
                    )
               );
               return elem;
          }
     }]);

     return Family;
}(React.Component);

var element = React.createElement(Family, null);

ReactDOM.render(element, document.getElementById('fam'));