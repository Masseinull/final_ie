
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Container, Typography, useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import PreRegisterTable from "../components/PreRegister/PreRegisterTable";
import UserHeader from "../components/User/UserHeader";

import React, { useState } from 'react';

const BoxStyle = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(4)}px auto`,
  borderRadius: theme.spacing(2),
  boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px`,
  overflow: "hidden",

  //border: "2px solid teal",
}));

const PreRegister = () => {
  // media queries
  const less400 = useMediaQuery("(max-width:400px)");
  const less480 = useMediaQuery("(max-width:480px)");
  const less600 = useMediaQuery("(max-width:600px)");
  const less768 = useMediaQuery("(max-width:768px)");
  const handleInputChange = (e) => {
    setData(e.target.value);
  };
  const [data, setData] = useState('');
  const [open, setOpen] = useState(false);
  const handleSubmit = () => {
    // Perform submission logic here with the data value

    // Reset the data
    setData('');

    // Close the dialog
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> پیش ثبت نام  </title>
      </Helmet>

      <Container maxWidth="lg" disableGutters>
      <UserHeader  button={" واحد جدید"} link={"/cFaculty"} />
        <Typography variant="h5" align="center" gutterBottom>
        پیش ثبت نام
      </Typography>
        <Box
      sx={{
        borderBottom: '1px solid #ccc',
        paddingBottom: '0px',
      }}
    >
      {/* Your header content goes here */}
    </Box>
        {/* User Table */}

        <BoxStyle
          sx={{
            width: less400
              ? 300
              : less480
              ? 360
              : less600
              ? 540
              : less768
              ? 440
              : "100%",
          }}
        >
          <PreRegisterTable />
        </BoxStyle>
     <Box display="flex" justifyContent="center" >

      <Button variant="contained" color="primary" size="large" 
        style={{ fontSize: '17px' ,width: '130px', height: '50px' }}
        onClick={handleOpenDialog} >
        ارسال
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle align="center"> ارسال پیش ثبت نام </DialogTitle>
   
        <DialogActions style={{ width: '200px' }}>
          <Button onClick={handleSubmit} color="success"  style={{ fontSize: '18px' }}
>
          تایید 
          </Button>
        </DialogActions>
      </Dialog>
    </Box>

      </Container>
    </>
  );
};

export default PreRegister;
