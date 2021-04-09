import React from 'react';
import {CloneButton} from 'react-admin';

const omitHours = ({spent_hours, description, ...rest}) => rest;

export default ({record, ...props}) => (
    <CloneButton {...props} record={omitHours(record)}/>
)