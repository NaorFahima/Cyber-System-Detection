import React, { useState } from "react";
import { Input, Table } from "./";
import {
  makeStyles,
  Toolbar,
  InputAdornment,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
  },
}));

export default function ReportsCard({ records, headCells, handleClick }) {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    Table(records, headCells, filterFn);

  const handleSearch = (e) => {
    let search = e.target.value;
    setFilterFn({
      fn: (items) => {
        if (search === "") return items;
        else
          return items.filter((x) => x.domain.toLowerCase().includes(search));
      },
    });
  };

  return (
    <>
      <Toolbar>
        <Input
          label="Search Websites"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item, index) => (
            <TableRow key={index} onClick={() => handleClick(item)}>
              {headCells.map((value, index) => (
                <TableCell key={index}> {item[value.id]} </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
}
