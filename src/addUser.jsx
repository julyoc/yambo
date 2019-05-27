class AddUser extends React.Component {

    /**
     * 
     * @param {*} props 
     */
    constructor (props) {
        super(props);

        /**
         * 
         * @property {string} nombre
         * @property {string} url
         * @property {string} pass
         * @property {bool} root
         * @property {string} cargo
         */
        this.state = {
            nombre: "",
            url: "",
            pass: "",
            root: false,
            cargo: ""
        }
    }


    setName (event) {
        this.setState({
            nombre: event.target.value
        });
    }
    
    setUrl (event) {
        this.setState({
            url: event.target.value
        });
    }

    setPass (event) {
        this.setState({
            pass: event.target.value
        });
    }

    setRoot (event) {
        if (this.state.root) {
            this.setState({
                root: false
            });
        } else {
            this.setState({
                root: true
            });
        }
    }

    setCargo (event) {
        this.setState({
            cargo: event.target.value
        });
    }

    /**
     * 
     * @returns {*}
     */
    render () {

        /**
         * 
         * @type {*}
         */
        var elem = (
            <form action="/addUser" method="post">
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" name="nombre" id="name" value={this.state.nombre} onChange={(event => this.setName(event)).bind(this)} required/>
                </div>
                <div>
                    <label htmlFor="url">Direccion (url):</label>
                    <input type="text" name="url" id="url" value={this.state.url} onChange={(event => this.setUrl(event)).bind(this)} required/>
                </div>
                <div>
                    <label htmlFor="pass">Contraseña:</label>
                    <input type="password" name="pass" id="pass" value={this.state.pass} onChange={(event => this.setPass(event)).bind(this)} required/>
                </div>
                <div>
                    <input type="radio" name="root" id="root" value={this.state.root} onClick={(event => this.setRoot(event)).bind(this)}/>
                    <label htmlFor="root">Acceso root</label>
                </div>
                <div>
                    <label htmlFor="cargo">Cargo/Puesto:</label>
                    <input type="text" name="cargo" id="cargo" value={this.state.cargo} onChange={(event => this.setCargo(event)).bind(this)} required/>
                </div>
                <div>
                    {this.state.cargo != "" && this.state.nombre != "" && this.state.pass != "" && this.state.url !="" && this.state.pass.length >= 7 && this.state.confirm ? <input type="submit" value="Guardar Usuario"/> : <input type="submit" value="Guardar Usuario" disabled/>}
                    <input type="reset" value="Limpiar Datos"/>
                </div>
            </form>
        );

        return elem;
    }
}

var elemento = <AddUser></AddUser>;

ReactDOM.render(
    elemento,
    document.getElementById('addUser')
);