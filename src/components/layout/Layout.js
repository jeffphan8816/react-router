import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import {Fragment} from "react";

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation/>
            <div className={classes.main}>
                {props.children}
            </div>
        </Fragment>
    );
};

export default Layout;