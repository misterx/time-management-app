import React from 'react';
import './App.css';
import {Admin,Resource} from "react-admin";
import dataProvider from './dataProvider'
import authProvider from "./authProvider";
import Login from './components/login';
import Projects from './components/projects';
import Tasks from './components/tasks';
import Users from './components/users';
import ReportByMonthList from './components/reports/ReportByMonthList';
import ReportByMonthDay from './components/reports/ReportByDayList';
import ReportByRangeList from './components/reports/ReportByRangeList';
import {API_EP} from "./constants";

function App() {
  return (
      <Admin
          title="Time management"
          dataProvider={dataProvider(API_EP)}
          authProvider={authProvider}
          loginPage={Login}
      >
          {(permissions) => [
              <Resource name={"tasks"} {...Tasks}/>,
              permissions==='admin'?<Resource name={"projects"} {...Projects}/>:<Resource name={"projects"}/>,
              permissions==='admin'?<Resource name={"users"} {...Users}/>:null,
              permissions==='admin'?<Resource name={"report_by_month"} list={ReportByMonthList}/>:null,
              permissions==='admin'?<Resource name={"report_by_day"} list={ReportByMonthDay}/>:null,
              permissions==='admin'?<Resource name={"rpc/report_by_range"} list={ReportByRangeList} options={{ label: 'Report by interval' }}/>:null,
          ]}
      </Admin>
  );
}

export default App;
