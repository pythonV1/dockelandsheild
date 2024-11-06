// PageTitle.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatTitle = (path) => {
  const pathnames = path.split('/').filter((x) => x);
  const lastPathname = pathnames[pathnames.length - 1];
  return capitalizeFirstLetter(lastPathname.replace(/-/g, ' '));
};

const PageTitle = () => {
  const location = useLocation();
  const title = formatTitle(location.pathname);

  return <h4 className='title'>{title}</h4>;
};

export default PageTitle;
