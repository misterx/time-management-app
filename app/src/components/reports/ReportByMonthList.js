import React from 'react';
import ReportList from './ReportList'
import { TextField, ReferenceField, SelectInput, NumberField,Filter, ReferenceInput } from 'react-admin';
import {USER_ROLE} from "../../constants";

const months = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames.map((name,id)=>({id:id+1,name}));

};
const years = (len) => {
    let cy = (new Date()).getFullYear();
    return [...new Array(len)].map((_,i)=>({id:cy-i,name:cy-i}));
};
const ReportFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput source="project_id" reference="projects" alwaysOn >
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="user_id" reference="users" alwaysOn filter={{role:USER_ROLE}}>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <SelectInput label="Month" source="month" choices={months()} alwaysOn/>
        <SelectInput label="Year" source="year"  choices={years(2)} alwaysOn/>
    </Filter>
);

export default (props) => (
    <ReportList {...props} sort={{field: 'year', order: 'DESC'}} filters={<ReportFilter/>} filterDefaultValues={{month:(new Date()).getMonth()+1, year: (new Date()).getFullYear() }}>
        <ReferenceField source="project_id" reference="projects" linkType={false}>
            <TextField source="name"/>
        </ReferenceField>
        <ReferenceField source="user_id" reference="users" linkType={false}>
            <TextField source="name"/>
        </ReferenceField>
        <NumberField source="hours"/>
    </ReportList>
);