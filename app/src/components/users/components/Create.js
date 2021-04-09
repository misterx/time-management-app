import React from 'react';
import {Create,SimpleForm,TextInput,SelectInput} from 'react-admin';
import {ROLES} from "../../../constants";
import {
    required,
    minLength,
    email
} from 'react-admin';

export default (props) => (
    <Create{...props}>
        <SimpleForm title="New user" redirect={"list"}>
            <TextInput source="email" validate={[required(),email()]}/>
            <TextInput source="name" validate={[required(),minLength(3)]}/>
            <TextInput source="pass" type="password" validate={[required(),minLength(3)]}/>
            <SelectInput source="role" choices={ROLES} validate={[required()]}/>
        </SimpleForm>
    </Create>
);