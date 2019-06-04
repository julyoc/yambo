class Adm extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               "url": this.props.url,
               "root": this.props.root
          };
          this.famfunc = this.famfunc.bind(this);
          this.subf = this.subf.bind(this);
          this.platofunc = this.platofunc.bind(this);
          this.clifunc = this.clifunc.bind(this);
          this.pedfunc = this.pedfunc.bind(this);
     }

     famfunc (event){
          /**
           * @type {string}
           */
          var url = window.location +"/famAdd";
          window.location.replace(url);
          console.log(url);
     }

     subf (event){
          /**
           * @type {string}
           */
          var url = window.location +"/sub-famAdd";
          window.location.replace(url);
          console.log(url);
     }

     platofunc (event){
          /**
           * @type {string}
           */
          var url = window.location +"/prodAdd";
          window.location.replace(url);
          console.log(url);
     }

     clifunc (event){
          /**
           * @type {string}
           */
          var url = window.location +"/cliAdd";
          window.location.replace(url);
          console.log(url);
     }

     pedfunc (event){
          /**
           * @type {string}
           */
          var url = window.location +"/nuevo-pedido";
          window.location.replace(url);
          console.log(url);
     }

     editFam (event) {
          /**
           * @type {string}
           */
          var url = window.location +"/editFam";
          window.location.replace(url);
          console.log(url);
     }

     editSubFam (event) {
          /**
           * @type {string}
           */
          var url = window.location +"/editSubFam";
          window.location.replace(url);
          console.log(url);
     }

     editPlato (event) {
          /**
           * @type {string}
           */
          var url = window.location +"/editPlato";
          window.location.replace(url);
          console.log(url);
     }

     render () {
          const styles = {
               "backgroundColor": "rgb(6, 23, 10)",
               "width": "120px",
               "height": "60px",
               "fontSize": "17px",
               "color":"white",
               "borderRadius":"90px",
               "display": "table-cell",
               "textAlign": "center",
               "justifyContent": "center",
               "alignItems": "center",
               "paddingTop": "15px"
          }
          const s1 = {
               "width":"100%"
          }
          const dv = {
               "width": "3em",
               "display": "table-cell"
          }
          var rootpar = (
               <div key={1}>
                    <div style={styles} onClick={this.famfunc}>
                         <p>Agregar Nueva Familia</p>
                    </div>
                    <div style={dv}></div>
                    <div style={styles} onClick={this.subf}>
                         <p>Agregar Nueva Sub-familia</p>
                    </div>
                    <div style={dv}></div>
                    <div style={styles} onClick={this.platofunc}>
                         <p>Agragar Nuevo Plato</p>
                    </div>
                    <br/>
                    <div style={styles} onClick={(event => this.editFam(event)).bind(this)}>
                         <p>Editar <br/> Familia</p>
                    </div>
                    <div style={dv}></div>
                    <div style={styles} onClick={(event => this.editSubFam(event)).bind(this)}>
                         <p>Editar <br/> Sub-familia</p>
                    </div>
                    <div style={dv}></div>
                    <div style={styles} onClick={(event => this.editPlato(event)).bind(this)}>
                         <p>Editar <br/> Plato</p>
                    </div>
               </div>
          );
          var elem = (
               <div style={s1}>
                    <div style={styles} onClick={this.clifunc}>
                         <p>Agregar Nuevo Cliente</p>
                    </div>
                    <div style={dv}></div>
                    <div style={styles} onClick={this.pedfunc}>
                         <p>Agregar Nuevo Pedido</p>
                    </div>
                    <br/>
                    {this.state.root ? rootpar: null}
               </div>
          );
          return elem;
     }
}

url = getSingle('url', (doc) => {return doc;});
root = getSingle('conf', (doc) => {return doc;});

const element = (<Adm url={url} root={root}></Adm>);

ReactDOM.render(
     element,
     document.getElementById('adm')
);
