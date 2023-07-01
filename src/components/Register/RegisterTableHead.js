import {
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
  } from "@material-ui/core";
  import { Box } from "@mui/system";
  import { visuallyHidden } from "@mui/utils";
  
  const headCells = [
    {
      id: "cname",
      label: "نام درس",
    },
    {
      id:"lname" ,
      label: "نام استاد",
    },
    {
      id: "faculty",
      label: "دانشکده",
    },
    {
      id: "role",
      label: "ترم",
    },
    {
      id: "status",
      label: "واحد",
    },
  ];
  
  const RegisterTableHead = (props) => {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
  
    // sort
    const createSortHandler = (property) => (e) => onRequestSort(e, property);
  
    return (
      <TableHead>
        <TableRow>
          {/* ck box */}
          <TableCell padding="checkbox">
     
          
          </TableCell>
  
          {/* rest of the cells */}
          {headCells.map((cell) => (
            <TableCell
              key={cell.id}
              sortDirection={orderBy === cell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === cell.id}
                direction={orderBy === cell.id ? order : "asc"}
                onClick={createSortHandler(cell.id)}
              >
                {cell.label}
  
                {/* hidden box */}
                {orderBy === cell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  
  export default RegisterTableHead;
  