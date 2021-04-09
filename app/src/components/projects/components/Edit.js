import React from 'react';
import {Edit,SimpleForm,TextInput} from 'react-admin'
const Title = ({ record }) => {
    console.log(record);
    return <span>Project {record ? `"${record.name}"` : ''}</span>;
};

export default (props) => (
    <Edit {...props} title={<Title/>}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);