var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Subfam = function (_React$Component) {
     _inherits(Subfam, _React$Component);

     function Subfam(props) {
          _classCallCheck(this, Subfam);

          var _this = _possibleConstructorReturn(this, (Subfam.__proto__ || Object.getPrototypeOf(Subfam)).call(this, props));

          _this.state = {
               superFam: _this.props.fams,
               sfm: "",
               descrip: "",
               rad: false,
               file: false
          };
          _this.sfamiAct = _this.sfamiAct.bind(_this);
          _this.descripAct = _this.descripAct.bind(_this);
          _this.cl = _this.cl.bind(_this);
          _this.rad = _this.rad.bind(_this);
          _this.fl = _this.fl.bind(_this);
          _this.image = React.createRef();
          return _this;
     }

     _createClass(Subfam, [{
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
                    sfm: "",
                    descrip: "",
                    rad: false,
                    file: false
               });
          }
     }, {
          key: "sfamiAct",
          value: function sfamiAct(event) {
               this.setState({
                    sfm: event.target.value
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
               var ac = "/addsubfamily";
               var fam = [];
               for (var i = 0; i < this.state.superFam.length; i++) {
                    fam[i] = React.createElement(
                         "div",
                         { key: i },
                         React.createElement("input", { type: "radio", id: this.state.superFam[i].nombre, name: "superFam", value: this.state.superFam[i].nombre, onClick: this.rad }),
                         React.createElement(
                              "label",
                              { htmlFor: this.state.superFam[i].nombre },
                              this.state.superFam[i].nombre
                         )
                    );
               }
               sumit = null;
               if (this.state.sfm === "" || this.state.descrip === "" || !this.state.rad || !this.state.file) {
                    sumit = React.createElement(
                         "div",
                         null,
                         React.createElement("input", { type: "submit", name: "", value: "Crear subFam", disabled: true }),
                         React.createElement("input", { type: "reset", name: "", value: "Limpiar Datos", onClick: this.cl })
                    );
               } else {
                    sumit = React.createElement(
                         "div",
                         null,
                         React.createElement("input", { type: "submit", name: "", value: "Crear subFam" }),
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
                                   { htmlFor: "sfm" },
                                   React.createElement(
                                        "strong",
                                        null,
                                        "Nombre de la Subfamilia: "
                                   )
                              ),
                              React.createElement("br", null),
                              React.createElement("input", { type: "text", name: "sfm", id: "sfm", placeholder: "Sub-Familia", value: this.state.sfm, onChange: this.sfamiAct, required: true })
                         ),
                         React.createElement(
                              "div",
                              null,
                              fam
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
                                        "Descripcion de la Subfamilia: "
                                   )
                              ),
                              React.createElement("br", null),
                              React.createElement("textarea", { name: "descrip", rows: "4", cols: "39", placeholder: "Descripcion general", value: this.state.descrip, onChange: this.descripAct, required: true })
                         ),
                         React.createElement(
                              "div",
                              null,
                              React.createElement("input", { type: "file", name: "image", id: "image", placeholder: "subfamilia", ref: this.image, accept: "image/*", onChange: this.fl, required: true })
                         ),
                         React.createElement("br", null),
                         sumit
                    )
               );
               return elem;
          }
     }]);

     return Subfam;
}(React.Component);

data = getVars('fm', function (doc) {
     return doc;
});

var element = React.createElement(Subfam, { fams: data });
ReactDOM.render(element, document.getElementById('sub'));