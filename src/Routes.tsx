import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { OrderHomeForm } from './milktea-project/components/order/order-home';
import { OrderTableForm } from './milktea-project/components/order/order-table';
import { LoginForm } from './common/components/login';
import { CashierComponent } from './milktea-project/components/cashier/cashier-component';

export const MilkTeaRoutes: React.FunctionComponent = (props: any) => (
    <Switch>
        <Route exact path="/order" component={OrderHomeForm} />
        <Route exact path="/order/:tableId" component={OrderTableForm} name="test" />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/cashier" component={CashierComponent} />
        <Redirect from="/" to="/login" />
        </Switch>
)
