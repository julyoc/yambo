class Edit extends React.Component { 

    constructor (props) { 
        super(props);
        this.obj = [];
        this.state ={
            data: props.data,
            ord: false
        }
    }

    edit (event, i) {
        /**
         * 
         * @type {*} 
         */
        console.log(this.obj[i].current);
        var fn = this.props.data.find(doc => {
            return doc.nombre === this.obj[i].current.innerText;
        });
        console.log(fn);
        /**
         * @type {string}
         */
        var url = window.location +"/"+ fn._id;
        window.location.replace(url);
        console.log(url);
    }

    ordenar (event) {
        if (!this.state.ord) {
            this.props.data.sort((a, b) => {
                if (a.nombre > b.nombre) {
                     return 1;
                }
                if (a.nombre < b.nombre) {
                     return -1;
                }
                return 0;
            });
            this.setState({
                data: this.props.data
            });
            this.setState({
                ord: true
            });
        } else {
            this.props.data.sort((a, b) => {
                if (a.nombre < b.nombre) {
                     return 1;
                }
                if (a.nombre > b.nombre) {
                     return -1;
                }
                return 0;
            });
            this.setState({
                data: this.props.data
            });
            this.setState({
                ord: false
            });
        }
    }



    render() {

        /**
         * 
         * @type {Object} 
         */
        var styles = {
            "border": "black 1px solid",
            "borderCollapse":"collapse",
            "height": "15px",
            "wordWrap": "break-word",
            "fontSize": "13px",
            "padding": "1px"
        }

        /**
         * 
         * @type {Object} 
         */
        var styleT = {
            "backgroundColor": "white",
            "border": "black 1px solid",
            "tableLayout": "fixed",
            "width": "75%"
        }

        /**
         * 
         * @type {Object} 
         */
        var st = {
            "height": "20em",
            "width": "100%",
            "overflowY": "scroll"
        }

        /**
         * 
         * @type {Array<*>} 
         */
        var filas = [];

        for (const i in this.state.data) {
            if (this.state.data.hasOwnProperty(i)) {
                this.obj.push(React.createRef());
                filas.push((
                    <tr key={i.toString()}>
                        <td ref={this.obj[i]} style={styles} onClick={(event => this.edit(event, i)).bind(this)}>{this.state.data[i].nombre}</td>
                    </tr>
                ));
            }
        }

        /**
         * 
         * @type {*}
         */
        var elem = (
            <div style={st}>
                <table style={styleT}>
                    <thead>
                        <tr>
                            <th style={styles} onClick={(event => this.ordenar(event)).bind(this)}>Nombre:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filas}
                    </tbody>
                </table>
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