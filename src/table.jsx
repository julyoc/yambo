class ListTable extends React.Component {
     constructor(props) {
          super(props);
          this.findclick = this.findclick.bind(this);
          this.redic = this.redic.bind(this);
          this.ordNombre = this.ordNombre.bind(this);
          this.ordCedula = this.ordCedula.bind(this);
          this.ordtel = this.ordtel.bind(this);
          this.orddir = this.orddir.bind(this);
          this.rednew = this.rednew.bind(this);
          this.url = this.props.url;
          this.props.dates.sort((a, b) => {
               if (a.nombre > b.nombre) {
                    return 1;
               }
               if (a.nombre < b.nombre) {
                    return -1;
               }
               return 0;
          });
          this.state = {
                    dat: this.props.dates
          };
     }

     ordNombre(event){
          this.props.dates.sort((a, b) => {
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

     ordCedula(event){
          this.props.dates.sort((a, b) => {
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

     ordtel(event){
          this.props.dates.sort((a, b) => {
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

     orddir(event){
          this.props.dates.sort((a, b) => {
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

     redic (event){
          var cedula = event.target.innerText;
          var url = "https://"+window.location.host+"/"+this.url+"/admin/nuevo-pedido?ci="+cedula;
          window.location.replace(url);
     }

     findclick (event) {
          var temp = MaysPrimera(event.target.value.toLowerCase());
          console.log(temp);
          var arr = this.props.dates.filter((doc) => {
               return temp === doc.nombre.substr(0, temp.length) || temp === doc.cedula.substr(0, temp.length);
          });
          console.log(arr);
          this.setState({dat: arr});
     }

     rednew (event) {
          var url = window.location +"/cliAdd";
          window.location.replace(url);
          console.log(url);
     }

     render() {
          var styles = {
               "border": "black 1px solid",
               "borderCollapse":"collapse",
               "height": "15px",
               "wordWrap": "break-word",
               "fontSize": "13px",
               "padding": "1px"
          }
          var styleT = {
               "backgroundColor": "white",
               "border": "black 1px solid",
               "tableLayout": "fixed",
               "width": "100%"
          }
          var st = {
               "height": "15em",
               "width": "100%",
               "overflowY": "scroll"
          }
          var et= [];
          var i = 0;
          for (var x in this.state.dat){
               et[i] = (
                    <tr key = {i.toString()}>
                         <td style={styles}>{this.state.dat[x].nombre}</td>
                         <td style={styles} onClick={this.redic}>{this.state.dat[x].cedula}</td>
                         <td style={styles}>{this.state.dat[x].direccion.ciudad + ": " + this.state.dat[x].direccion.calles}</td>
                         <td style={styles}>{this.state.dat[x].telefono}</td>
                    </tr> );
               i = i+1;
          }
          var elem = (
               <div>
                    <div>
                         <input type="text" size="20" onChange={this.findclick}></input>
                         <button type="button" onClick={this.rednew}>Nuevo</button>
                    </div>
                    <br/>
                    <div style={st}>
                    <table style={styleT}>
                         <thead>
                              <tr>
                                   <th style={styles} onClick={this.ordNombre}>Nombre</th>
                                   <th style={styles} onClick={this.ordCedula}>Cedula</th>
                                   <th style={styles} onClick={this.orddir}>Direccion</th>
                                   <th style={styles} onClick={this.ordtel}>Telefono</th>
                              </tr>
                         </thead>
                         <tbody>
                              { et }
                         </tbody>
                    </table>
                    </div>
                    <span>{"Click en la cedula para realizar Pedido"}</span>
               </div>
          );
          return elem;
     }
}

url = getSingle('url', (doc) => {return doc;});

data = getVars('tb', (doc) => {return doc;});

const element = <ListTable dates={data} url={url}></ListTable>;

ReactDOM.render(
     element,
     document.getElementById('table')
);
