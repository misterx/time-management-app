import React from 'react';
import ReportList from './ReportList'
import {TextField, ReferenceField, SelectInput, NumberField,Filter, ReferenceInput, DateInput } from 'react-admin';
import {USER_ROLE} from "../../constants";

const ReportFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput source="project_id" reference="projects" alwaysOn >
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="user_id" reference="users" alwaysOn filter={{role:USER_ROLE}}>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <DateInput label="Start At" source="rpc_start_at" alwaysOn/>
        <DateInput label="End At" source="rpc_end_at" alwaysOn />
    </Filter>
);
const pastDate = (days)=>{
    var d = new Date();
    d.setDate(d.getDate() - days);
    return d;
}
export default (props) => (
    <ReportList {...props} sort={{field: 'hours', order: 'DESC'}} filters={<ReportFilter/>}
                filterDefaultValues={{
                    rpc_start_at:pastDate(30).toLocaleDateString('en'),
                    rpc_end_at:(new Date()).toLocaleDateString('en')
                }}>
        <ReferenceField source="project_id" reference="projects" linkType={false}>
            <TextField source="name"/>
        </ReferenceField>
        <ReferenceField source="user_id" reference="users" linkType={false}>
            <TextField source="name"/>
        </ReferenceField>
        <NumberField source="hours"/>
    </ReportList>
);