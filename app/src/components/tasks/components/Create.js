import React from 'react';
import {Create,SimpleForm,TextInput,ReferenceInput, SelectInput,NumberInput} from 'react-admin';
import {DateInput} from 'react-admin';
import {
    required,
    minLength,
    minValue,
    maxValue
} from 'react-admin';
import {USER_ROLE} from "../../../constants";

export default ({permissions,...props}) => (
    <Create {...props}>

        <SimpleForm title="Create task"  defaultValue={{date: new Date()}} redirect={"list"}>
            <DateInput source="date" validate={[required()]}/>
            <ReferenceInput source="project_id" reference="projects" validate={[required()]}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            {permissions==='admin'?<ReferenceInput source="user_id" reference="users" validate={[required()]} filter={{role:USER_ROLE}}>
                <SelectInput optionText="name" />
            </ReferenceInput>:null}
            <NumberInput source="spent_hours" validate={[required(),minValue(0.5),maxValue(32)]} />

            <TextInput source="description" rows="3" multiline validate={[required(),minLength(10)]}/>

        </SimpleForm>
    </Create>
);