import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import ListStudents from '../pages/Students/List';
import ListPlan from '../pages/Plan/List';
import InvalidRoute from '../pages/InvalidRoute';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/list" component={ListStudents} isPrivate />
      <Route path="/plan/list" component={ListPlan} isPrivate />

      <Route path="/" component={InvalidRoute} />
    </Switch>
  );
}
