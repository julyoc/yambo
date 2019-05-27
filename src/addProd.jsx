class Producto extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               nombre: "",
               fm: this.props.fm,
               sfm: this.props.sfm,
               selc: "",
               pre: "",
               descrip: "",
               rad: false,
               rad1: false,
               rad2: false,
               file: false,
               iva: false
          };
          this.nom = this.nom.bind(this);
          this.fm = this.fm.bind(this);
          this.sfm = this.sfm.bind(this);
          this.pres = this.pres.bind(this);
          this.descripAct = this.descripAct.bind(this);
          this.cl = this.cl.bind(this);
          this.rad = this.rad.bind(this);
          this.fl = this.fl.bind(this);
          this.iva = this.iva.bind(this);
          this.image = React.createRef();
     }

     iva (event) {
          this.setState({
               iva: true
          });
     }

     fl (event) {
          if (event.target.value) {
               this.setState({
                    file: true
               });
          }
     }

     rad (event) {
          this.setState({
               rad: true
          });
     }

     cl (event) {
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

     descripAct (event) {
          this.setState({
                    descrip: event.target.value
          });
     }

     pres (event) {
          this.setState({
               pre: event.target.value
          });
     }

     nom (event) {
          this.setState({
               nombre: event.target.value
          });
     }

     fm (event) {
          this.setState({
               selc: event.target.value,
               rad1: true
          });
     }

     sfm (event) {
          this.setState({
               selc: event.target.value,
               rad2: true
          });
     }

     render() {
          selc = [];
          if(this.state.selc === "fam"){
               selc = [];
               for (var i = 0; i < this.state.fm.length; i++) {
                    selc[i] = (
                         <div key={i}>
                              <input type="radio" id={this.state.fm[i].nombre} name="sfm" value={this.state.fm[i].nombre} onClick={this.rad}/>
                              <label htmlFor={this.state.fm[i].nombre}>{this.state.fm[i].nombre}</label>
                         </div>
                    )
               }
          } else if (this.state.selc === "sfam") {
               selc = [];
               for (var i = 0; i < this.state.sfm.length; i++) {
                    selc[i] = (
                         <div key={i}>
                              <input type="radio" id={this.state.sfm[i].nombre} name="sfm" value={this.state.sfm[i].nombre} onClick={this.rad}/>
                              <label htmlFor={this.state.sfm[i].nombre}>{this.state.sfm[i].nombre}</label>
                         </div>
                    )
               }
          } else {
               selc = [];
          }
          sumit = null;
          if (this.state.nombre === "" || this.state.selc === "" || this.state.pre === "" || this.state.descrip === "" || !this.state.rad || !this.state.rad1 || !this.state.file) {
               sumit = (
                    <div>
                         <input type="submit" name="" value="Agregar" disabled/>
                         <input type="reset" name="" value="Limpiar Datos" onClick={this.cl}/>
                    </div>
               );
          } else {
               sumit = (
                    <div>
                         <input type="submit" name="" value="Agregar"/>
                         <input type="reset" name="" value="Limpiar Datos" onClick={this.cl}/>
                    </div>
               );
          }

          var ac = "/newProduct";
          var elem = (
               <div>
                    <form method="POST" action={ac} encType="multipart/form-data">
                         <div>
                              <label htmlFor="nombre"><strong>{"Nombre del Producto:"}</strong></label>
                              <br/>
                              <input type="text" name="nombre" id="nombre" placeholder="Producto" value={this.state.nombre} onChange={this.nom} required/>
                         </div>
                         <div>
                              <span><strong>{"Ludar de preparacion:"}</strong></span>
                              <br/>
                              <input type="checkbox" id="bar" name="lugar" value="ba" onClick={this.sfm}/>
                              <label htmlFor="bar">{"Bar"}</label>
                              <input type="checkbox" id="par" name="lugar" value="pa" onClick={this.sfm}/>
                              <label htmlFor="par">{"Parrilla"}</label>
                              <input type="checkbox" id="coc" name="lugar" value="co" onClick={this.sfm}/>
                              <label htmlFor="coc">{"Cocina"}</label>
                         </div>
                         <div>
                              <label><strong>{"Pertenece a:"}</strong></label>
                              <br/>
                              <input type="radio" id="fam" name="fm" value="fam" onClick={this.fm}/>
                              <label htmlFor="fam">{"Familia"}</label>
                              <input type="radio" id="sfam" name="fm" value="sfam" onClick={this.fm}/>
                              <label htmlFor="sfam">{"Subfamilia"}</label>
                              <div>
                                   {selc}
                              </div>
                         </div>
                         <div>
                              <label htmlFor="precio"><strong>{"Precio:"}</strong></label>
                              <br/>
                              <input type="radio" id="iva" name="iva" value={true} onClick={this.iva}/>
                              <label htmlFor="iva">{"Incluye IVA"}</label>
                              <br/>
                              <input type="text" name="precio" id="precio" placeholder="Precio" value={this.state.pre} onChange={this.pres} pattern="[0-9]{2}|[0-9]|[0-9]{2}.[0-9]{2}|[0-9].[0-9]|[0-9].[0-9]{2}|[0-9]{2}.[0-9]" required/>
                              <span>{"(.) para separar decimales"}</span>
                         </div>
                         <div>
                              <input type="file" name="image" id="image" placeholder="Familia" ref={this.image} accept="image/*"  onChange={this.fl} required/>
                         </div>
                         <div>
                              <label htmlFor="descrip"><strong>{"Descripcion de la Familia: "}</strong></label>
                              <br/>
                              <textarea name="descrip" rows="4" cols="39" placeholder="Descripcion general" value={this.state.descrip} onChange={this.descripAct} required></textarea>
                         </div>
                         <br/>
                         {sumit}
                    </form>
               </div>
          );
          return elem;
     }
}

data = getVars('fm', (doc) => {return doc;});
data1 = getVars('sfm', (doc) => {return doc;});

const element = <Producto fm={data} sfm={data1}></Producto>;

ReactDOM.render(
     element,
     document.getElementById('prod')
);
