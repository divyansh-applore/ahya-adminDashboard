import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: "16px !important",
    fontSize: "15px",
  },
  body: {
    fontSize: "14px",
  },
  root: {
    padding: "4px 16px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {props.columns.map((column) => {
                return <StyledTableCell align="left">{column}</StyledTableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .filter((val) => {
                if (props.searchTerm && props.searchTerm.toLowerCase() == "")
                  return val;
                else if (
                  val.name
                    .toLowerCase()
                    .includes(props.searchTerm.trim().toLowerCase()) ||
                  val.email
                    .toLowerCase()
                    .includes(props.searchTerm.trim().toLowerCase())
                ) {
                  return val;
                }
              })
              .reverse()
              .map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row._id}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.status.toString()}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.role}</StyledTableCell>
                  {/* <StyledTableCell align="left">{row.Userrole}</StyledTableCell> */}
                  <StyledTableCell align="left">
                    {" "}
                    <Button
                      onClick={() => {
                        deleteHandler(row._id);
                      }}
                      size="small"
                      variant="outlined"
                      color="primary"
                      startIcon={<DeleteIcon />}
                    ></Button>
                    <Button
                      onClick={() => {
                        props.Edit(row);
                      }}
                      size="small"
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                    ></Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {props.rows.length == 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100px",
            fontSize: 18,
          }}
        >
          <p>No Members added</p>
        </div>
      )}
    </>
  );
}
