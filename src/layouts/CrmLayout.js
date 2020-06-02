import React from 'react';
import HeaderCRM from './../components/HeaderCRM';

const CrmLayout = props => {
    return (
        <div>
            <HeaderCRM {...props}/>
            <div className="main">
                {props.children}
            </div>
        </div>
    );
};

export default CrmLayout;
