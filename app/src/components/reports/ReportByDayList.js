import React from 'react';
import ReportList from './ReportList'
import {DateField, TextField, ReferenceField, SelectInput, NumberField,Filter, ReferenceInput, DateInput } from 'react-admin';
import {USER_ROLE} from "../../constants";

const ReportFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput source="project_id" reference="projects" alwaysOn >
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="user_id" reference="users" alwaysOn filter={{role:USER_ROLE}}>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <DateInput label="Date" source="date" alwaysOn/>
    </Filter>
);

export default (props) => (
    <ReportList {...props} sort={{field: 'date', order: 'DESC'}} filters={<ReportFilter/>} filterDefaultValues={{date:(new Date()).toLocaleDateString('en')}}>
        <ReferenceField source="project_id" reference="projects" linkType={false}>
            <TextField source="name"/>
        </ReferenceField>
        <ReferenceField source="user_id" reference="users" linkType={false}>
            <TextField source="name"/>
        </ReferenceField>
        <DateField source="date"/>
        <NumberField source="hours"/>
    </ReportList>
);