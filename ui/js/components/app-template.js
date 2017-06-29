import React from 'react';
import Logo from './generics/app-logo';
import Menu from './generics/app-menu';

export default (props) => {
    return (
        <div className="container">
            <div className="col-xs-6 col-md-4">
                <Logo />
                <Menu />
            </div>
            <div className="col-xs-12 col-md-8">
                {props.children}
            </div>
        </div>
    )
}
