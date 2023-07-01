import {
    IconButton,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
  } from "@material-ui/core";
  import { styled } from "@material-ui/styles";
  import { RiDeleteBinFill, RiFilter3Fill } from "react-icons/ri";
  import { Search as SearchIcon } from '@mui/icons-material';
  import React, { useState } from 'react';

  const TableToolbar = ({ numSelected }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
      // Perform search or submit logic here with the searchQuery value
  
      // Reset the search query
      setSearchQuery('');
    };
    // style
    const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderRadius: "8px 8px 0 0",
      backgroundColor: numSelected > 0 ? theme.palette.green.light : "inherit",
  
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
  
      // input style
      "& .MuiInputBase-root": {
        borderRadius: theme.spacing(1),
      },
      "& label.Mui-focused": {
        color: theme.palette.success.main,
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: theme.palette.success.main,
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: theme.palette.success.main,
        },
      },
  
      // selectedText
      "& .selectedText": {
        fontSize: 18,
        fontWeight: numSelected > 0 ? 500 : 400,
        color: numSelected > 0 ? theme.palette.green.dark : "inherit",
      },
    }));
  
    return (
      <ToolbarStyle>
        {/* input search or selected items length */}
        {numSelected > 0 ? (
          <Typography
            variant="subtitle1"
            component="div"
            className="selectedText"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <form onSubmit={handleFormSubmit}>
          <TextField
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton type="submit" edge="end" size="large">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </form>
        )}
  
        {/*  icons */}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <RiDeleteBinFill />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter List">
            <IconButton>
              <RiFilter3Fill />
            </IconButton>
          </Tooltip>
        )}
      </ToolbarStyle>
    );
  };
  
  export default TableToolbar;
  