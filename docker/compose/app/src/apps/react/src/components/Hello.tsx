import * as React from "react"
import * as PropTypes from "prop-types"

interface IHello {
    (args: any): any;
    propTypes?: any
}

const Hello: IHello = ({ onClick, message }) => {
    return (
        <div>
            <h1>{message}</h1>
            <button onClick={onClick}>Click</button>
        </div>
    );
};

Hello.propTypes = {
    onClick: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

export default Hello;
