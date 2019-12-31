import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import ListStudents from '~/pages/Students/List';
import StoreStudent from '~/pages/Students/Form';
import ListPlan from '~/pages/Plans/List';
import StorePlan from '~/pages/Plans/Form';
import ListEnrollment from '~/pages/Enrollments/List';
import StoreEnrollment from '~/pages/Enrollments/Form';
import ListQuestions from '~/pages/Questions/List';
import InvalidRoute from '~/pages/InvalidRoute';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students/list" component={ListStudents} isPrivate />
      <Route path="/students/store" component={StoreStudent} isPrivate />
      <Route path="/students/update/:id" component={StoreStudent} isPrivate />

      <Route path="/plans/list" component={ListPlan} isPrivate />
      <Route path="/plans/store" component={StorePlan} isPrivate />
      <Route path="/plans/update/:id" component={StorePlan} isPrivate />

      <Route path="/enrollments/list" component={ListEnrollment} isPrivate />
      <Route path="/enrollments/store" component={StoreEnrollment} isPrivate />
      <Route
        path="/enrollments/update/:id"
        component={StoreEnrollment}
        isPrivate
      />

      <Route path="/questions/list" component={ListQuestions} isPrivate />

      <Route path="/" component={InvalidRoute} />
    </Switch>
  );
}
