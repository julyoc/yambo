class Edit extends React.Component { 

    constructor (props) { 
        super(props);
    }

    render() {

        /**
         * 
         * @type {*}
         */
        var elem = (
            <div>
                
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

const element = <Edit></Edit>;

ReactDOM.render(
    element,
    document.getElementById('elem')
);