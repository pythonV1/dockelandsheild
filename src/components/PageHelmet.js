// PageHelmet.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatTitle = (path) => {
  const pathnames = path.split('/').filter((x) => x);

  // If the path is the root ("/"), set the default title to "Login"
  if (pathnames.length === 0) {
    return 'Login';
  }

  const lastPathname = pathnames[pathnames.length - 1];
  return capitalizeFirstLetter(lastPathname.replace(/-/g, ' ')) || 'Unknown Page';
};

const PageHelmet = () => {
  const location = useLocation();
  const title = formatTitle(location.pathname);

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default PageHelmet;
