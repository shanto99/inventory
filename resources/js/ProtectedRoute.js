import { Navigate } from "react-router-dom";
import {connect} from "react-redux";

function ProtectedRoute({children, ...restProps}) {

    const isAuthenticated = restProps.user;
    return isAuthenticated ? children : <Navigate to="/login"/>;
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ProtectedRoute);
