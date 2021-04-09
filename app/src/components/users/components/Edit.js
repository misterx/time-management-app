import React from 'react';
import {Edit,SimpleForm,TextInput,SelectInput} from 'react-admin';
import {ROLES} from "../../../constants";
import {
    required,
    minLength,
    email
} from 'react-admin';
const Title = ({ record }) => {
    console.log(record);
    return <span>User {record ? `"${record.name}"` : ''}</span>;
};
export default (props) => (
    <Edit{...props} title={<Title/>}>
        <SimpleForm>
            <TextInput source="email" validate={[required(),email()]}/>
            <TextInput source="name" validate={[required(),minLength(3)]}/>
            <TextInput source="pass" type="password" validate={[minLength(3)]}/>
            <SelectInput source="role" choices={ROLES} validate={[required()]}/>
        </SimpleForm>
    </Edit>
);