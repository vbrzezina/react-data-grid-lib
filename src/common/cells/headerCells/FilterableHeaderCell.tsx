import React, { useState } from 'react';
import { FilterRendererProps, RowData, AddFilterEvent } from '../../types';

export default function FilterableHeaderCell({ column, onChange }: FilterRendererProps) {
  const [filterTerm, setFilterTerm] = useState();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const filterTerm = value === '' ? [] : [{
      type: 0,
      value
    }];
    setFilterTerm(filterTerm);
    if (onChange) {
      onChange({
        filterTerm, column, filterValues, rawValue: value
      });
    }
  }

  function filterValues(row: RowData, columnFilter: AddFilterEvent, columnKey: string): boolean {
    if (!columnFilter.filterTerm.length) return true;

    // implement default filter logic
    const value = row[columnKey] as string;
    const regex = new RegExp(columnFilter.filterTerm[0].value as string, 'gi');
    return !!(value.match(regex));
  }

  if (column.filterable === false) {
    return <div />;
  }

  return (
    <div className="form-group">
      <input
        key={`header-filter-${column.key}`}
        className="form-control input-sm"
        placeholder="Search"
        value={filterTerm}
        onChange={handleChange}
      />
    </div>
  );
}
