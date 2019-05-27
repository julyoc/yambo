class Subfam extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               superFam: this.props.fams,
               sfm: "",
               descrip: "",
               rad: false,
               file: false
          };
          this.sfamiAct = this.sfamiAct.bind(this);
          this.descripAct = this.descripAct.bind(this);
          this.cl = this.cl.bind(this);
          this.rad = this.rad.bind(this);
          this.fl = this.fl.bind(this);
          this.image = React.createRef();
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
               sfm: "",
               descrip: "",
               rad: false,
               file: false
          });
     }

     sfamiAct (event) {
          this.setState({
                    sfm: event.target.value
          });
     }
     descripAct (event) {
          this.setState({
                    descrip: event.target.value
          });
     }

     render() {
          var ac ="/addsubfamily";
          var fam = [];
          for (var i = 0; i < this.state.superFam.length; i++) {
               fam[i] = (
                    <div key={i}>
                         <input type="radio" id={this.state.superFam[i].nombre} name="superFam" value={this.state.superFam[i].nombre} onClick={this.rad}/>
                         <label htmlFor={this.state.superFam[i].nombre}>{this.state.superFam[i].nombre}</label>
                    </div>
               );
          }
          sumit = null;
          if ( this.state.sfm === "" || this.state.descrip === "" || !this.state.rad || !this.state.file ) {
               sumit = (
                    <div>
                         <input type="submit" name="" value="Crear subFam" disabled/>
                         <input type="reset" name="" value="Limpiar Datos" onClick={this.cl}/>
                    </div>
               );
          } else {
               sumit = (
                    <div>
                         <input type="submit" name="" value="Crear subFam"/>
                         <input type="reset" name="" value="Limpiar Datos"  onClick={this.cl}/>
                    </div>
               );
          }
          var elem = (
               <div>
                    <form method="POST" action={ac} encType="multipart/form-data">
                         <div>
                              <label htmlFor="sfm"><strong>{"Nombre de la Subfamilia: "}</strong></label>
                              <br/>
                              <input type="text" name="sfm" id="sfm" placeholder="Sub-Familia" value={this.state.sfm} onChange={this.sfamiAct} required/>
                         </div>
                         <div>{fam}</div>
                         <div>
                              <label htmlFor="descrip"><strong>{"Descripcion de la Subfamilia: "}</strong></label>
                              <br/>
                              <textarea name="descrip" rows="4" cols="39" placeholder="Descripcion general" value={this.state.descrip} onChange={this.descripAct} required></textarea>
                         </div>
                         <div>
                              <input type="file" name="image" id="image" placeholder="subfamilia" ref={this.image} accept="image/*" onChange={this.fl} required/>
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

const element = <Subfam fams={data}></Subfam>;
ReactDOM.render(
     element,
     document.getElementById('sub')
);
