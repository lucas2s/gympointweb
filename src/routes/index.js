import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import ListStudents from '../pages/Students/List';
import ListPlan from '../pages/Plan/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students/list" component={ListStudents} />
      <Route path="/plan/list" component={ListPlan} />
    </Switch>
  );
}
