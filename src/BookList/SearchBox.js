import React from 'react';
import { TextField } from '@material-ui/core';
import clone from 'lodash.clone'
import isEmpty from 'lodash.isempty'

const SearchBox = ({ term, onSearch }) => {
  const protect = (event) => {
    const value = clone(event.target.value)
    if (!isEmpty(value.trim())) {
      return onSearch(event);
    }
  }
  return (
    <TextField
      label="Search"
      value={term}
      data-test='search'
      onChange={protect}
      margin='normal'
      variant='outlined' />
  )
};

export default SearchBox;