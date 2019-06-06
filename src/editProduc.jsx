class Edit extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            nombre: props.data.nombre,
            familyid: props.data.familyid,
            lugar: props.data.lugar,
            precio: props.data.precio.precio,
            iva: props.data.precio.iva,
            descripcion: props.data.descripcion
        }
    }

    setNombre (event) {
        this.setState({
            nombre: event.target.value
        });
    }

    setPrecio (event) {
        this.setState({
            precio: event.target.value
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
         * @type {Array<*>} 
         */
        lista =[];
        for (const i in this.props.fam) {
            if (this.props.fam.hasOwnProperty(i)) {
                lista.push((
                    <option value={this.props.fam[i]._id} key={i} selected={this.props.fam[i]._id === this.state.familyid ? true: false}>{this.props.fam[i].nombre}</option>
                ));
            }
        }

        /**
         * 
         * @type {Array<*>} 
         */
        lista1 = [];
        for (const i in this.props.sfam) {
            if (this.props.sfam.hasOwnProperty(i)) {
                lista1.push((
                    <option value={this.props.sfam[i]._id} key={i}  selected={this.props.sfam[i]._id === this.state.familyid ? true: false}>{this.props.sfam[i].nombre}</option>
                ));
            }
        }


        /**
         * 
         * @type {*} 
         */
        var elem = (
            <div>
                <form action="/editProd" encType="multipart/form-data" method="post">
                    <div>
                        <label htmlFor="nombre">Nombre:&nbsp;</label>
                        <input type="text" id="nombre" name="nombre" value={this.state.nombre} onChange={(event => this.setNombre(event)).bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="familyid">seleccionar Familia o Subfamilia:&nbsp;</label>
                        <select name="familyid" id="familyid">
                            <optgroup label="Family">{lista}</optgroup>
                            <optgroup label="Sub-Family">{lista1}</optgroup>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="precio">Precio:&nbsp;</label>
                        <input type="text" id="precio" name="precio" value={this.state.precio} onChange={(event => this.setPrecio(event)).bind(this)}/>
                    </div>
                    <div>
                        <input type="file" name="imagen" accept="image/*" id="imagen"/>
                    </div>
                    <div>
                        <label htmlFor="descripcion">descripcion:&nbsp;</label>
                        <textarea name="descripcion" id="descripcion" cols="30" rows="4" onChange={(event => this.des(event)).bind(this)} value={this.state.descripcion}></textarea>
                    </div>
                    <input type="text" name="iva" value={this.state.iva ? "true": "false"} style={{"display": "none"}} readOnly/>
                    <div>
                        <input type="submit" value="Guardar Cambios"/>
                    </div>
                </form>
                <form action="/elimProd" method="post">
                    <input type="text" name="id" value={this.props.data._id} style={{"display": "none"}} readOnly/>
                    <input type="submit" value="Eliminar"/>
                    <span>Se elimina el plato Seleccionado</span>
                </form>
            </div>
        );
        console.log(this.state.iva);
        return elem;
    }
}

/**
 * 
 * @type {Array<*>}
 */
var data = getVars('data', (doc) => {return doc;});

/**
 * 
 * @type {Array<*>}
 */
var dfam = getVars('fam', (doc) => {return doc;});

/**
 * 
 * @type {Array<*>}
 */
var dsfam = getVars('sfam', (doc) => {return doc;});

/**
 * 
 * @type {*} 
 */
const element = <Edit data={data} fam={dfam} sfam={dsfam}></Edit>;

ReactDOM.render(
    element,
    document.getElementById('elem')
);