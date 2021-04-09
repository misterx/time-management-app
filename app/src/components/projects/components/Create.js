import React from 'react';
import {Create,SimpleForm,TextInput} from 'react-admin';

export default (props) => (
    <Create{...props}>
        <SimpleForm title="Create new project" redirect="list">
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);