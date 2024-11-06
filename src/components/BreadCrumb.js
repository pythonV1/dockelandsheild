import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatBreadcrumbName = (name) => {
  return capitalizeFirstLetter(name.replace(/-/g, ' '));
};

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb className="breadcrumb-list">
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = formatBreadcrumbName(name);

        return isLast ? (
          <Breadcrumb.Item key={name} active>
            {formattedName}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={name} linkAs={Link} linkProps={{ to: routeTo }}>
            {formattedName}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadCrumb;
