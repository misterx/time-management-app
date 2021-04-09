import React from 'react';
import {Pagination, List, Datagrid} from 'react-admin';
import exporter from '../shared/ProjectUserExporter';

const TasksPagination = props => <Pagination rowsPerPageOptions={[]} {...props} />

export default (props) => {
    return <List title="Report" perPage={150} {...props} bulkActionButtons={false} exporter={exporter()} pagination={<TasksPagination/>}>
        <Datagrid>
            {props.children}
        </Datagrid>
    </List>
};