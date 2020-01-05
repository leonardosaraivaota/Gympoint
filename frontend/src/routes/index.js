import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import Students from '../pages/Student';
import StudentsEdit from '../pages/Student/Edit';
import StudentsList from '../pages/Student/List';

import HelpOrder from '../pages/HelpOrder';
import HelpOrderEdit from '../pages/HelpOrder/Edit';
import HelpOrderList from '../pages/HelpOrder/List';

import Plan from '../pages/Plan';
import PlanEdit from '../pages/Plan/Edit';
import PlanList from '../pages/Plan/List';

import Registration from '../pages/Registration';
import RegistrationEdit from '../pages/Registration/Edit';
import RegistrationList from '../pages/Registration/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/Edit" component={StudentsEdit} isPrivate />
      <Route path="/students/List" component={StudentsList} isPrivate />

      <Route path="/registrations" exact component={Registration} isPrivate />
      <Route
        path="/registrations/Edit"
        component={RegistrationEdit}
        isPrivate
      />
      <Route
        path="/registrations/List"
        component={RegistrationList}
        isPrivate
      />

      <Route path="/plans" exact component={Plan} isPrivate />
      <Route path="/plans/Edit" component={PlanEdit} isPrivate />
      <Route path="/plans/List" component={PlanList} isPrivate />

      <Route path="/helpOrders" exact component={HelpOrder} isPrivate />
      <Route path="/helpOrders/Edit" component={HelpOrderEdit} isPrivate />
      <Route path="/helpOrders/List" component={HelpOrderList} isPrivate />
    </Switch>
  );
}
