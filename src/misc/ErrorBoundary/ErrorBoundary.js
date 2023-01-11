// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import DashboardPlaceholder from '../../charts/Dashboard/components/DashboardPlaceholder';

// As of React 17.0, error boundaries can only be implemented with class components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    const { title, description } = this.props;
    if (this.state.hasError) {
      return <DashboardPlaceholder title={title} label={description} />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
  description: PropTypes.string,
  title: PropTypes.string,
};

export default ErrorBoundary;
