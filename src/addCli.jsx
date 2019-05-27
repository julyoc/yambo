class Client extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               nombre: "",
               cedula: "",
               telefono: "",
               ciudad: "",
               calles: "",
               mail: "",
               men: ""
          }
          this.nom = this.nom.bind(this);
          this.ci = this.ci.bind(this);
          this.tel = this.tel.bind(this);
          this.ciu = this.ciu.bind(this);
          this.calle = this.calle.bind(this);
          this.mail = this.mail.bind(this);
          this.cl = this.cl.bind(this);
     }

     cl (event) {
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

     mail (event) {
          this.setState({
               mail: event.target.value
          });
     }

     calle (event) {
          this.setState({
               calles: event.target.value
          });
     }

     ciu (event) {
          this.setState({
               ciudad: event.target.value
          });
     }

     tel (event) {
          this.setState({
               telefono: event.target.value
          });
     }

     nom (event) {
          this.setState({
               nombre: mayPalabras(event.target.value)
          });
     }

     ci (event) {
          this.setState({
               cedula: event.target.value,
               men: ""
          });
          var fil = this.props.cli.filter((doc) => {
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

     render() {
          sumit = null;
          if (this.state.nombre === "" || this.state.cedula === "" || this.state.telefono === "" || this.state.mail === "" || !(this.state.telefono.length >= 7 && this.state.telefono.length <= 13)|| !(this.state.cedula.length >= 10 && this.state.cedula.length <= 11)) {
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
          var ac = "/newClient";
          var elem = (
               <div>
                    <form method="POST" action={ac}>
                         <div>
                              <label htmlFor="nombre">{"Nombre:"}</label>
                              <br/>
                              <input type="text" name="nombre" id="nombre" placeholder="Nombre cliente" value={this.state.nombre} onChange={this.nom} required/>
                         </div>
                         <div>
                              <label htmlFor="cedula">{"Cedula:"}</label>
                              <br/>
                              <input type="text" name="cedula" id="cedula" placeholder="999999999-0" pattern="[0-9]{9}-[0-9]|[0-9]{10}" value={this.state.cedula} onChange={this.ci} required/>
                              <span>{this.state.men}</span>
                         </div>
                         <div>
                              <label htmlFor="telefono">{"Telefono:"}</label>
                              <br/>
                              <input type="text" name="telefono" id="telefono" placeholder="0999999999" pattern="[0-9]{7}|[0-9]{8}|[0-9]{9}|[0-9]{10}|[0-9]{11}|[0-9]{12}|+[0-9]{12}|[0-9]{13}" value={this.state.telefono} onChange={this.tel} required/>
                         </div>
                         <div>
                              <label htmlFor="mail">{"Correo Electronico:"}</label>
                              <br/>
                              <input type="email" name="mail" id="mail" placeholder="ejemplo@ejemplo.com" value={this.state.mail} onChange={this.mail} required/>
                         </div>
                         <div>
                              <label>{"Direccion:"}</label>
                              <div>
                                   <label htmlFor="ciudad:">{"Ciudad"}</label>
                                   <input type="text" name="ciudad" id="ciudad" placeholder="Ciudad" value={this.state.ciudad} onChange={this.ciu}/>
                              </div>
                              <div>
                                   <label htmlFor="calles">{"Calles:"}</label>
                                   <input type="text" name="calles" id="calles" placeholder="calle A, calle B" value={this.state.calles} onChange={this.calle}/>
                              </div>
                         </div>
                         <br/>
                         {sumit}
                    </form>
               </div>
          );
          return elem;
     }
}

data = getVars('data', (doc) => {return doc;});

const element = <Client cli={data}></Client>;

ReactDOM.render(
     element,
     document.getElementById('cli')
);
