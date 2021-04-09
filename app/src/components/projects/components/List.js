import React from 'react';
import { List, SimpleList } from 'react-admin';
export default ({permissions,...props}) => {
    return <List {...props} title="Projects" sort={{field: 'name', order: 'ASC'}}>
        <SimpleList
            primaryText={record => record.name}
        />
    </List>
};