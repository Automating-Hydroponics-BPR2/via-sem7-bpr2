import React from 'react';
import { DashboardProps } from './dashboard.props';

export const Dashboard = (props: DashboardProps) => {
  return <div>{props.title}</div>;
};
