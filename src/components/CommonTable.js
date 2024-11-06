// CommonTable.js

import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CommonTable = ({ headers, rows, onDelete, onEdit }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (sortConfig.key === null) return 0;

    const keyA = a[headers.indexOf(sortConfig.key)];
    const keyB = b[headers.indexOf(sortConfig.key)];

    if (keyA < keyB) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (keyA > keyB) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  return (
    <Table className="common-table" bordered striped responsive>
      <thead>
        <tr>
          <th>Sl No</th>
          {headers.map((header) => (
            <th key={uuidv4()} onClick={() => handleSort(header)}>
              {header}
              {sortConfig.key === header && (
                <span className="sorting-arrow">
                  {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                </span>
              )}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((rowData, rowIndex) => (
          <tr key={uuidv4()}>
            <td>{rowIndex + 1}</td>
            {rowData.map((cellData) => (
              <td key={uuidv4()}>{cellData}</td>
            ))}
            <td>
              <Button
                className="btn-edit me-1"
                onClick={() => onEdit(rowIndex)}
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>{' '}  {onDelete && (
              <Button className="btn-delete" onClick={() => onDelete(rowIndex)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button> )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Add PropTypes validation
CommonTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  //editLinkPath: PropTypes.string.isRequired,
};

export default CommonTable;
