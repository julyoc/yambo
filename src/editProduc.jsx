class Edit extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        /**
         * 
         * @type {*} 
         */
        var elem = (
            <div>
                <form action="/elimProd" method="post">
                    <input type="text" name="id" value={this.props.data._id} style={{"display": "none"}} readOnly/>
                    <input type="submit" value="Eliminar"/>
                    <span>Se elimina el plato Seleccionado</span>
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

const element = <Edit data={data}></Edit>;

ReactDOM.render(
    element,
    document.getElementById('elem')
);