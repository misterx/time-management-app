import React from 'react';
import {Edit,SimpleForm,TextInput,ReferenceInput, SelectInput,NumberInput} from 'react-admin';
import {DateInput} from 'react-admin';
import {
    required,
    minLength,
    minValue,
    maxValue
} from 'react-admin';
import {USER_ROLE} from "../../../constants";

const Title = ({ record }) => {
    return <span>Task at {record.date}</span>;
};

export default ({permissions,...props}) => (
    <Edit {...props} title={<Title/>} undoable={false}>
        <SimpleForm title="Change task" >
            <DateInput source="date" validate={[required()]}/>
            <ReferenceInput source="project_id" reference="projects" validate={[required()]}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="spent_hours" validate={[required(),minValue(0.5),maxValue(32)]} />
            {permissions==='admin'?<ReferenceInput source="user_id" reference="users" validate={[required()]} filter={{role:USER_ROLE}}>
                <SelectInput optionText="name" />
            </ReferenceInput>:null}

            <TextInput source="description" rows="3" multiline validate={[required(),minLength(10)]} />

        </SimpleForm>
    </Edit>
);