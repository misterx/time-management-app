import React from 'react';
import { List, SimpleList} from 'react-admin';
import {roleToText} from "../../../constants";


export default (props) => {
    return <List {...props} title="Users" exporter={false}>
        <SimpleList primaryText={record => record.name}
                    secondaryText={record => record.email}
                    tertiaryText={record => roleToText(record.role)}
        />
    </List>
};