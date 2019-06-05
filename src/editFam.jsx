class Edit extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            nombre: this.props.data.nombre,
            descripcion: this.props.data.descripcion,
            imagen: this.props.data.imagen
        }
    }

    name (event) {
        this.setState({
            nombre: event.target.value
        });
    }

    des (event) {
        this.setState({
            descripcion: event.target.value
        });
    }

    render () {
        /**
         * 
         * @type {*} 
         */
        var elem = (
            <div>
                <form action="/modFam" method="post" encType="multipart/form-data">
                    <div>
                        <label htmlFor="name">Nombre:&nbsp;</label>
                        <input type="text" id="name" name="nombre" value={this.state.nombre} onChange={(event => this.name(event)).bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="descripcion">descripcion:&nbsp;</label>
                        <textarea name="descripcion" id="descripcion" cols="30" rows="4" onChange={(event => this.des(event)).bind(this)} value={this.state.descripcion}></textarea>
                    </div>
                    <div>
                        <input type="file" name="imagen" accept="image/*" id="imagen"/>
                    </div>
                    <input type="text" name="id" value={this.props.data._id} style={{"display": "none"}} readOnly/>
                    <input type="submit" value="Guardar Cambios"/>
                </form>
                <form action="/elimFam" method="post">
                    <input type="text" name="id" value={this.props.data._id} style={{"display": "none"}} readOnly/>
                    <input type="submit" value="Eliminar"/>
                    <span>Si elimina se eliminaran todas las subfamilias y los platos pertenecientes.</span>
                </form>
            </div>
        );
        return elem;
    }
}

/**
 * 
 * @type {Array<*>}
 */
var data = getVars('data', (doc) => {return doc;});

console.log(data);

const element = <Edit data={data}></Edit>;

ReactDOM.render(
    element,
    document.getElementById('elem')
);