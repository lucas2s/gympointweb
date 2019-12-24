import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import ListStudents from '~/pages/Students/List';
import StoreUpdateStudent from '~/pages/Students/StoreUpdate';
import ListPlan from '~/pages/Plans/List';
import ListEnrollment from '~/pages/Enrollments/List';
import ListQuestions from '~/pages/Questions/List';
import InvalidRoute from '~/pages/InvalidRoute';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/list" exact component={ListStudents} isPrivate />
      <Route
        path="/students/update/:id"
        exact
        component={StoreUpdateStudent}
        isPrivate
      />
      <Route
        path="/students/store"
        exact
        component={StoreUpdateStudent}
        isPrivate
      />
      <Route path="/plans/list" component={ListPlan} isPrivate />
      <Route path="/enrollments/list" component={ListEnrollment} isPrivate />
      <Route path="/questions/list" component={ListQuestions} isPrivate />

      <Route path="/" component={InvalidRoute} />
    </Switch>
  );
}
