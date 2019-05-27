class Family extends React.Component {
     constructor(props) {
          super(props);
          this.famiAct = this.famiAct.bind(this);
          this.descripAct = this.descripAct.bind(this);
          this.cl = this.cl.bind(this);
          this.fl = this.fl.bind(this);
          this.state = {
               fami: "",
               descrip: "",
               file: false
          };
          this.image = React.createRef();
     }

     fl (event) {
          if (event.target.value) {
               this.setState({
                    file: true
               });
          }
     }

     cl (event) {
          this.setState({
               fami: "",
               descrip: "",
               file: false
          });
     }

     famiAct (event) {
          this.setState({
                    fami: event.target.value
          });
     }
     descripAct (event) {
          this.setState({
                    descrip: event.target.value
          });
     }
     render() {
          var ac ="/addfamily";
          sumit = null;
          if ( this.state.fami === "" || this.state.descrip === "" || !this.state.file ) {
               sumit = (
                    <div>
                         <input type="submit" name="" value="Crear Familia" disabled/>
                         <input type="reset" name="" value="Limpiar Datos" onClick={this.cl}/>
                    </div>
               );
          } else {
               sumit = (
                    <div>
                         <input type="submit" name="" value="Crear Familia"/>
                         <input type="reset" name="" value="Limpiar Datos" onClick={this.cl}/>
                    </div>
               );
          }
          var elem = (
               <div>
                    <form method="POST" action={ac} encType="multipart/form-data">
                         <div>
                              <label htmlFor="fami"><strong>{"Nombre de la Familia: "}</strong></label>
                              <br/>
                              <input type="text" name="fami" id="fami" placeholder="Familia" value={this.state.fami} onChange={this.famiAct} required/>
                         </div>
                         <div>
                              <label htmlFor="descrip"><strong>{"Descripcion de la Familia: "}</strong></label>
                              <br/>
                              <textarea name="descrip" rows="4" cols="39" placeholder="Descripcion general" value={this.state.descrip} onChange={this.descripAct} required></textarea>
                         </div>
                         <div>
                              <input type="file" name="image" id="image" placeholder="Familia" ref={this.image} accept="image/*" onChange={this.fl} required/>
                         </div>
                         <br/>
                         {sumit}
                    </form>
               </div>
          );
          return elem;
     }
}


const element = <Family></Family>;

ReactDOM.render(
     element,
     document.getElementById('fam')
);
