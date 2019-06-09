class CiInput extends React.Component {
     
     /**
      * 
      * @param {Object} props 
      */
     constructor(props) {
          super(props);
          
          /**
           * 
           * @type {*}
           */
          var std = this.props.cli.find((doc) => {
               return doc._id.toString() === props.client;
          });
          this.state = {
               client: this.props.cli,
               cedula: std.cedula,
               ptt: std
          };
          this.ci = this.ci.bind(this);
          this.cli = this.cli.bind(this);
          console.log("ingresar cedula");
     }

     /**
      * 
      * @param {Object} event 
      */
     cli (event) {
          this.setState({
               cedula: this.state.ptt.cedula
          });
     }

     /**
      * 
      * @param {Object} event 
      */
     ci (event) {
          /**
           * 
           * @type {*}
           */
          var std = this.state.client.filter((doc) => {
               return doc.cedula.substr(0, event.target.value.length) === event.target.value;
          });
          if (std[0]) {
               this.setState({
                    cedula: event.target.value,
                    ptt: std[0]
               });
          } else {
               this.setState({
                    cedula: event.target.value,
                    ptt: {nombre: "No encontrado", cedula: event.target.value}
               });
          }
     }

     /**
      * 
      * @returns {Object}
      */
     render () {
          /**
           * 
           * @type {Object}
           */
          var elem = (
               <div>
                    <label htmlFor="cedula"><strong>{"Ingrese el numero de cedula:"}</strong></label>
                    <br/>
                    <input type="text" name="cedula" id="cedula" pattern="[0-9]{9}-[0-9]|[0-9]{10}" value={this.state.cedula} onChange={this.ci} required/>
                    <span onClick={this.cli}>{" "+this.state.ptt.nombre + ": "+ this.state.ptt.cedula}</span>
               </div>
          );
          return elem;
     }
}

class Menu extends React.Component {

    /**
     * 
     * @param {Object} props 
     */
    constructor (props) {
        super (props);
        /**
           * 
           * @property {string} menu
           * @property {string} famId
           * @property {Array<*>} fam
           * @property {*} sfam
           * @property {*} prod
           * @property {boolean} opt
           * @property {boolean} platos
           * @property {Array<string>} observaciones
           * @property {Array<{plato: string, observaciones: string}>} consumo
           */
          this.state = {
            menu: "",
            famId: "",
            fam: this.props.fam,
            sfam: null,
            prod: null,
            opt: false,
            platos: true, 
            observaciones: [],
            consumo: [],
            allpr: this.props.prod

       }

       /**
        * 
        * @type {Array<{plato: string, observaciones: string}>}
        */
       this.consumo = [];

       /**
        * 
        * @type {string}
        */
       this.tempId = "";
       this.csm = React.createRef();
    }


     /**
      * 
      * @param {Object} event 
      */
     atras (event) {
        if (this.state.menu === "sf") {
             this.setState({
                  menu: "",
                  sfam: null
             });
        } else if (this.state.menu === "pro" && this.state.sfam) {
             this.setState({
                  menu: "sf"
             });
        } else if (this.state.menu === "pro") {
             this.setState({
                  menu: "",
                  sfam: null
             });
        }
   }

   /**
    * 
    * @param {Object} event 
    */
   mod (event) {
        this.setState({
             menu: ""
        });
   }

   /**
    * 
    * @param {*} event 
    */
   next (event) {
        this.setState({
             menu: "final"
        });
   }

   /**
    * 
    * @param {*} event 
    */
   delete (event) {
        /**
         * 
         * @type {number}
         */
        var index = this.consumo.findIndex((doc) => {
             return doc.observaciones === this.csm.current.innerText;
        });

        this.consumo.splice(index, 1);
        this.setState({
             consumo: this.consumo
        })
   }

   /**
    * 
    * @param {Object} event 
    */
   ovc (event, i) {
        let tmp = [];
        tmp[i] = this.option[i].current.value;
        this.setState({
             observaciones: tmp
        });
   }

   /**
    * 
    * @param {Object} event 
    */
   guardarPlato (event, i) {
        this.consumo.push({
             plato: this.tempId,
             observaciones: this.option[i].current.value
        });
        this.setState({
             consumo: this.consumo,
             menu: "",
             famId: "",
             sfam: null,
             prod: null,
             opt: false,
             platos: true, 
             observaciones: ""
        });
   }

   /**
    * 
    * @param {Object} event 
    */
   proSet (event) {
        this.setState({
             opt: true
        });
        this.tempId = event.target.value;
   }

   /**
    * 
    * @param {Object} event 
    */
   clpr (event) {
        /**
         * 
         * @type {*}
         */
        var pr = this.props.prod.filter((doc) => {
             return doc.familyid === event.target.value;
        });
        for (let i = 0; i < pr.length; i++) {
             this.option.push(React.createRef());
        }
        this.setState({
             menu: "pro",
             prod: pr,
             famId: event.target.value
        });
   }

   /**
    * 
    * @param {Object} event 
    */
   cl (event) {
        /**
         * 
         * @type {*}
         */
        var std = this.props.subfam.filter((doc) => {
             return doc.familyid === event.target.value;
        });
        this.option = [];
        if (std[0]) {
             this.setState({
                  menu: "sf",
                  sfam: std,
                  famId: event.target.value
             });
        } else {

             /**
              * 
              * @type {*}
              */
             var pr = this.props.prod.filter((doc) => {
                  return doc.familyid === event.target.value;
             });
             for (let i = 0; i < pr.length; i++) {
                  this.option.push(React.createRef());
             }
             this.setState({
                  menu: "pro",
                  prod: pr,
                  famId: event.target.value
             });
        }
   }

    /**
     * 
     * @returns {Object} 
     */
    render () {

        /**
           * 
           * @type {Object}
           */
          var opciones = (i) => (
            <div>
                 <div>
                      <div><textarea ref={this.option[i]} name="" id="" cols="10" rows="2" value={this.state.observaciones[i]} onChange={((event) => this.ovc(event, i)).bind(this)}></textarea></div>
                 </div>
                 <input type="button" value="Add" onClick={((event) => this.guardarPlato(event, i)).bind(this)}/>
            </div>
       );

       /**
        * 
        * @type {Array<Object>}
        */
       const stl = [
            {
                 "width": "1em",
                 "display": "table-cell"
            },
            {
                 "backgroundColor": "rgb(6, 23, 10)",
                 "width": "13em",
                 "height": "11em",
                 "fontSize": "17px",
                 "color":"white",
                 "borderRadius":"1em",
                 "display": "table-cell",
                 "textAlign": "center",
                 "justifyContent": "center",
                 "alignItems": "center",
                 "paddingTop": "15px"
            },
            {
                 "width": "6em",
                 "height": "6em"
            }
       ];

       /**
        * 
        * @type {Array<*>}
        */
       var arrFam = [];
       if (this.state.fam) {
            let i = 0;
            while (i < 2*this.state.fam.length) {
                 arrFam[i] = (
                      <div key={i} style={stl[1]}>
                           <input type="checkbox" name="fami" id={this.state.fam[i/2].nombre} value={this.state.fam[i/2]._id} onClick={((event) => this.cl(event)).bind(this)} style={{display: "none"}}/>
                           <label htmlFor={this.state.fam[i/2].nombre}>
                                <div>
                                     <img src={"/"+this.state.fam[i/2].imagen} alt="family" style={stl[2]}/>
                                     <h5>{this.state.fam[i/2].nombre}</h5>
                                </div>
                                <div>
                                     <p>{this.state.fam[i/2].descripcion}</p>
                                </div>
                           </label>
                      </div>
                 );
                 i++;
                 if (i === 5 || i === 11 || i === 17 || i === 23 || i === 29) {
                      arrFam[i] = (
                      <div key={i}><br/></div>
                      );
                 } else {
                      arrFam[i] = (
                      <div key={i} style={stl[0]}></div>
                      );
                 }
                 i++;
            }
       }

       /**
        * 
        * @type {Array<*>}
        */
       var arrSubfam = [];
       if (this.state.sfam) {
            let i = 0;
            while (i < 2*this.state.sfam.length){
                 arrSubfam[i] = (
                      <div key={i} style={stl[1]}>
                           <input type="checkbox" name="sfami" id={this.state.sfam[i/2].nombre} value={this.state.sfam[i/2]._id} onClick={((event) => this.clpr(event)).bind(this)} style={{display: "none"}}/>
                           <label htmlFor={this.state.sfam[i/2].nombre}>
                                <div>
                                     <img src={"/"+this.state.sfam[i/2].imagen} alt="family" style={stl[2]}/>
                                     <h5>{this.state.sfam[i/2].nombre}</h5>
                                </div>
                                <div>
                                     <p>{this.state.sfam[i/2].descripcion}</p>
                                </div>
                           </label>
                      </div>
                 );
                 i++;
                 if (i === 5 || i === 11 || i === 17 || i === 23 || i === 29) {
                      arrSubfam[i] = (
                      <div key={i}><br/></div>
                      );
                 } else {
                      arrSubfam[i] = (
                      <div key={i} style={stl[0]}></div>
                      );
                 }
                 i++;
            }
       }

       /**
        * 
        * @type {Array<*>}
        */
       var arrPruduc = [];
       if (this.state.prod) {
            let i = 0;
            while (i < 2*this.state.prod.length) {
                 arrPruduc[i] = (
                      <div key={i} style={stl[1]}>
                           <input type="checkbox" name="consumo" id={this.state.prod[i/2].nombre} value={this.state.prod[i/2]._id} style={{display: "none"}} onClick={((event) => this.proSet(event)).bind(this)}/>
                           <label htmlFor={this.state.prod[i/2].nombre}>
                                <div>
                                     <img src={'/'+this.state.prod[i/2].imagen} alt="Producto" style={stl[2]}/>
                                     <h5>{this.state.prod[i/2].nombre}</h5>
                                </div>
                                <div>
                                     <h6>{"$: "+this.state.prod[i/2].precio.precio}</h6>
                                     <p>{this.state.prod[i/2].descripcion}</p>
                                </div>
                           </label>
                           {this.state.opt ? opciones(i/2): null}
                      </div>
                 );
                 i++;
                 if (i === 5 || i === 11 || i === 17 || i === 23 || i === 29) {
                      arrPruduc[i] = (
                      <div key={i}><br/></div>
                      );
                 } else {
                      arrPruduc[i] = (
                      <div key={i} style={stl[0]}></div>
                      );
                 }
                 i++;
            }
       }
       
       /**
        * 
        * @type {Array<*>}
        */
       var final = [];
       if (this.consumo[0]){
            for (let i = 0; i < this.state.consumo.length; i++){
                 var product = this.state.allpr.filter((doc) => {
                      return doc._id === this.state.consumo[i].plato;
                 });
                 if (product[0]){
                      final[i] = (
                           <div key={i}>
                                <div style={{"display": "table-cell"}}><p><strong>{product[0].nombre + ":"}</strong></p></div>
                                <div ref={this.csm} style={{"display": "table-cell"}}><p>{this.state.consumo[i].observaciones}</p></div>
                                <div><input type="button" onClick={((event) => this.delete(event)).bind(this)} value="Eliminar"/></div>
                           </div>
                      );
                 }
            }
       }
       final.push(<div key={final.length}><br/></div>);
       final.push((
            <div key={final.length}>
                 <div style={{"display": "table-cell"}}>
                      <input type="button" onClick={((event) => this.mod(event)).bind(this)} value="Modificar"/>
                 </div>
                 <br/>
            </div>
       ));

        /**
         * 
         * @type {Object} 
         */
        var elem = (
            <div>
                <div style={{"backgroundColor": "black", "width": "70px", "color": "white", "borderRadius": "1em"}} onClick={((event) => this.atras(event)).bind(this)}>
                    <h5 style={{"fontSize": "2.5em"}}>&nbsp;{"<--"}</h5>
                </div>
                <div>
                    <h5><strong>{"Menu:"}</strong></h5>
                    <br/>
                    {this.state.menu === "" ? arrFam : null}
                    {this.state.menu === "sf" ? arrSubfam : null}
                    {this.state.menu === "pro" ? arrPruduc : null}
                    {this.state.menu === "final" ? final : <div><br/><input type="button" onClick={((event) => this.next(event)).bind(this)} value="Verificar Orden"/></div>}
                </div>
            </div>
        )

        return elem;
    }
}

class Modificar extends React.Component {

    /**
     * 
     * @param {Object} props 
     */
    constructor (props) {
        super (props);

        /**
         * 
         * @property {*} pedido 
         * @property {Array<*>} produc 
         * @property {boolean} showMenu 
         */
        this.state = {
            pedido: props.ped,
            produc: props.produc,
            showMenu: false,
            mesa: props.ped.mesa
        }
        
        this.menu = React.createRef();
        this.consumo = [];
    }

    save (event) {
        console.log(this.menu);
        var pd = this.state.pedido;
        console.log(this.menu.current.state.consumo);
        for (const j in this.menu.current.state.consumo) {
            if (this.menu.current.state.consumo.hasOwnProperty(j)) {
                pd.consumo.push(this.menu.current.state.consumo[j]);
                this.consumo.push(this.menu.current.state.consumo[j]);
            }
        }
        pd.precio = 0;
        for (const j in pd.consumo) {
            if (pd.consumo.hasOwnProperty(j)) {
                var fn = this.state.produc.find (doc => {
                    return doc._id === pd.consumo[j].plato;
                });
                pd.precio += parseFloat(fn.precio.precio);
            }
        }
        console.log(pd);
        this.setState({
            pedido: pd
        });
        this.menu.current.state.consumo = [];
    }

    /**
     * 
     * @param {*} event 
     */
    addMenu (event) {
        this.setState({
            showMenu: true
        });
    }

    /**
     * 
     * @param {*} event 
     * @param {number} i 
     */
    elim (event, i) {
        var pd = this.state.pedido;
        pd.consumo.splice(i, 1);
        if (this.props.ped.length <= i) {
             this.consumo.splice(i-props.ped.length, 1);
        }
        console.log(pd.consumo, i);
        pd.precio = 0;
        for (const j in pd.consumo) {
            if (pd.consumo.hasOwnProperty(j)) {
                var fn = this.state.produc.find (doc => {
                    return doc._id === pd.consumo[j].plato;
                });
                pd.precio += parseFloat(fn.precio.precio);
            }
        }
        console.log(pd.precio);
        this.setState({
            pedido: pd
        });
    }

    /**
     * 
     * @param {*} event 
     */
    setMesa (event) {
         this.setState({
              mesa: event.target.value
         });
    }

    /**
     * 
     * @returns {Object} 
     */
    render () {

        /**
         * 
         * @type {Object}
         */
        var st = {
            "height": "15em",
            "width": "100%",
            "overflowY": "scroll"
        }
        var styles = {
            "border": "black 1px solid",
            "borderCollapse":"collapse",
            "height": "15px",
            "wordWrap": "break-word",
            "fontSize": "13px",
            "padding": "1px"
        }
        var styElim = {
            "border": "black 1px solid",
            "borderCollapse":"collapse",
            "height": "15px",
            "wordWrap": "break-word",
            "fontSize": "13px",
            "padding": "1px",
            "width": "inherit"
        }
        var styleT = {
            "backgroundColor": "white",
            "border": "black 1px solid",
            "tableLayout": "fixed",
            "width": "100%"
        }

        const frm = (
            <div>
                <input type="text" name="pd" value={JSON.stringify(this.state.pedido)} style={{"display": "none"}} readOnly/>
                <input type="text" name="consumo" value={JSON.stringify(this.consumo)} style={{"display": "none"}} readOnly/>
                <input type="submit" value="finalizar"/>
            </div>
        );

        /**
         * 
         * @type {Array<*>} 
         */
        var pedList = [];
        for (const i in this.state.pedido.consumo) {
            if (this.state.pedido.consumo.hasOwnProperty(i)) {
                var fn = this.state.produc.find((doc) => {
                    return doc._id === this.state.pedido.consumo[i].plato;
                });
                if (!fn) {
                    continue;
                }
                pedList.push((
                    <tr key={i}>
                        <td style={styles}>{fn.nombre}</td>
                        <td style={styles}>$:&nbsp;{fn.precio.precio}</td>
                        <td style={styElim}><input type="button" onClick={((event, i) => this.elim(event, i)).bind(this)} value="Eliminar"/></td>
                    </tr>
                ));
            }
        }
        console.log(this.state.pedido);
        pedList.push((
            <tr key={pedList.length}>
                <td style={styles}><strong>Total:</strong></td>
                <td style={styles}><strong>$:&nbsp;{this.state.pedido.precio}</strong></td>
                <td style={styElim}>{frm}</td>
            </tr>
        ));

        /**
         * 
         * @type {Object} 
         */
        var elem = (
            <div>
                <form action="/edit" method="post">
                     <div>
                         <label htmlFor="mesa">Mesa #:&nbsp;</label>
                         <input type="text" id="mesa" name="mesa" value={this.state.mesa} onChange={(event => this.setMesa(event)).bind(this)}/>
                     </div>
                     <div>
                         <CiInput cli={this.props.cli} client={this.props.ped.clientid}></CiInput>
                     </div>
                     <br/>
                    <div style={st}>
                        <table style={styleT}>
                            <thead>
                                <tr>
                                    <th style={styles}>Plato:</th>
                                    <th style={styles}>Precio:</th>
                                    <th style={styElim}>Eliminar:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedList}
                            </tbody>
                        </table>
                    </div>
                    {this.state.showMenu ? <div><input type="button" onClick={(event => this.save(event)).bind(this)} value="Guardar Cambios"/><br/><Menu ref={this.menu} ped={this.state.pedido} fam={this.props.fam} subfam={this.props.sfam} prod={this.props.produc}></Menu></div> : <input type="button" onClick={((event) => this.addMenu(event)).bind(this)} value="AgregarPlato"/>}
                </form>
            </div>
        );

        return elem;
    }
}

/**
 * 
 * @type {string}
 */
var url = getSingle('url', (doc) => {return doc;});

/**
 * 
 * @type {Object}
 */
var pedido = getVars('pedido', (doc) => {return doc;});

/**
 * 
 * @type {Object}
 */
var fam = getVars('fam', (doc) => {return doc;});

/**
 * 
 * @type {Object}
 */
var sfam = getVars('sfam', (doc) => {return doc;});

/**
 * 
 * @type {Object}
 */
var produc = getVars('produc', (doc) => {return doc;});

/**
 * 
 * @type {Object}
 */
var cli = getVars('cli', (doc) => {return doc;});

/**
 * @type {Object}
 */
var element = <Modificar cli={cli} url={url} ped={pedido} fam={fam} sfam={sfam} produc={produc}></Modificar>;

ReactDOM.render(
    element,
    document.getElementById('modify')
);
