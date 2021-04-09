import { unparse as convertToCSV } from 'papaparse/papaparse.min';
import {downloadCSV} from 'react-admin';

const map = (record) => ({});

export default (mapCallback = map) => ((records,fetchRelatedRecords) => {
    fetchRelatedRecords(records,'user_id','users')
        .then(users=>(
            records.map(record => ({
                user: users[record.user_id].name,
                ...record,
            }))))
        .then(records=>(
            fetchRelatedRecords(records,'project_id','projects').then(projects=>(
                records.map(record => ({
                    project: projects[record.project_id].name,
                    ...record,
                    ...mapCallback(record)
                }))
            ))))
        .then((rows)=>{
            const data = rows.map(({id,user_id,project_id,...rest})=>rest);
            const csv = convertToCSV(data,{delimiter:";"});
            downloadCSV(csv,'report');
        })
});