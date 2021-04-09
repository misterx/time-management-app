import React from 'react';
import {DateInput,ReferenceInput,SelectInput,Filter, List, Datagrid, TextField, ReferenceField, NumberField, Pagination } from 'react-admin';
import {USER_ROLE} from "../../../constants";
import CloneButton from "./CloneButton";
import exporter from "../../shared/ProjectUserExporter";

const TasksPagination = props => <Pagination rowsPerPageOptions={[]} {...props} />

const TaskFilters = ({permissions,...props}) => (
    <Filter {...props}>
        <ReferenceInput source="project_id" reference="projects" alwaysOn >
            <SelectInput optionText="name" />
        </ReferenceInput>
        {permissions==='admin'?<ReferenceInput source="user_id" reference="users" alwaysOn filter={{role:USER_ROLE}}>
            <SelectInput optionText="name" />
        </ReferenceInput>:null}
        <DateInput label="From Date" source="date.gte" alwaysOn/>
        <DateInput label="To Date" source="date.lte" alwaysOn/>
    </Filter>
);
const exportMapper = (record) => {
    return  {
        description: record.description.trim(),
        spent_hours: record.spent_hours.toLocaleString(),
        ticket: record.description.match(/TK\d*/gim)
    }
};
export default ({permissions,...props}) => {
    return <List {...props} title="Tasks" exporter={permissions==='admin'?exporter(exportMapper):false} pagination={<TasksPagination/>} perPage={50} sort={{field: 'date', order: 'DESC'}} filters={<TaskFilters permissions={permissions}/>}>
        <Datagrid rowClick="edit">
            <TextField source="date"/>
            <TextField source="description"/>
            <NumberField source="spent_hours"/>
            <ReferenceField source="project_id" reference="projects" linkType={false}>
                <TextField source="name"/>
            </ReferenceField>

            {permissions==='admin'?<ReferenceField source="user_id" reference="users" linkType={false}>
                <TextField source="name"/>
            </ReferenceField>:null}
            <CloneButton />
        </Datagrid>
    </List>
};