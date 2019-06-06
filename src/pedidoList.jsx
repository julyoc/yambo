class PedidoList extends React.Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        /**
         * 
         * @property {*} pedidos
         * @property {string} btn
         */
        this.state = {
            pedidos: this.props.ped,
            btn: "", 
            imp: "false"
        };
        this.url = this.props.url;
    }

    /**
     * 
     * @param {Object} event 
     */
    all (event) {
        /**
         * 
         * @type {string}
         */
        var url = "https://"+window.location.host+"/"+this.url+"/pedidos/view-all";
        window.location.replace(url);
    }

    /**
     * 
     * @param {Object} event 
     * @param {number} i 
     */
    mod (event, i){
        /**
         * 
         * @type {string}
         */
        var url = "https://"+window.location.host+"/"+this.url+"/pedidos/mod/"+this.state.pedidos[i]._id;
        window.location.replace(url);
    }

    rad (event) {
        if (this.state.imp === "false") {
            this.setState({
                imp: "true"
            });
        } else {
            this.setState({
                imp: "false"
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
        var styleT = {
            "backgroundColor": "white",
            "border": "black 1px solid",
            "tableLayout": "fixed",
            "width": "100%"
        }

        var btn = (i) => {
            return (
                <form action="/fn" method="post">
                    <input type="button" onClick={((event) => this.mod(this, i)).bind(this)} value="Entrar"/><br/>
                    <input type="text" name="cancel"  style={{"display": "none"}} value={JSON.stringify({can:true, di:this.props.ped[i]._id})} readOnly/>
                    <input type="submit" value="Finalizar"/>
                </form>
            );
        }

        /**
         * 
         * @type {Array<*>}
         */
        var tb = [];
        for (let i = this.state.pedidos.length-1; i >= 0; i--) {
            tb.push(
                <tr key={i}>
                    <td style={styles}>{this.state.pedidos[i].fecha.substr(0,10)}</td>
                    <td style={styles}>{this.state.pedidos[i].clientid.cedula}</td>
                    <td style={styles}>{this.state.pedidos[i].mesa}</td>
                    <td style={styles}>{this.state.pedidos[i].cancelado ? "true": "false"}</td>
                    <td style={styles}>{"$ "+this.state.pedidos[i].precio}</td>
                    {this.state.pedidos[i].cancelado ? <td style={styles}>{"-----"}</td> : <td style={styles}>{btn(i)}</td>}
                </tr>
            );
        }

        /**
         * 
         * @type {*}
         */
        var elem = (
            <div>
                <div style={st}>
                    <table style={styleT}>
                        <thead>
                            <tr>
                                <th style={styles}>{"Fecha"}</th>
                                <th style={styles}>{"Numero de cedula"}</th>
                                <th style={styles}>{"Mesa"}</th>
                                <th style={styles}>{"Cancelado"}</th>
                                <th style={styles}>{"Total"}</th>
                                <th style={styles}>{"Opciones"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tb}
                        </tbody>
                    </table>
                </div>
                {this.props.root ? <button onClick={((event) => this.all(event)).bind(this)}>Ver Todos</button> : null}
            </div>
        );

        return elem;
    }
}

var url = getSingle('url', (doc) => {return doc;});

var root = getSingle('config', (doc) => {return doc});

var data = getVars('data', (doc) => {return doc;});

var element = <PedidoList url={url} ped={data} root={root}></PedidoList>;
ReactDOM.render(
    element,
    document.getElementById("ped")
);