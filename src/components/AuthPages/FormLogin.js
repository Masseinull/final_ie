import { useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useForm } from "react-hook-form";
import {add_user, login} from "../../redux/reducers/UsersReducer";
import { Redirect } from 'react-router-dom';

import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axios from "axios";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Typography from "@mui/material/Typography";
import { useGeneral } from "../../Contexts/general-context";

// style
const FormStyle = styled("form")(({ theme }) => ({
  // root style
  marginTop: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(3),

  // input style
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

  // error
  "& .Mui-error.MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.error.light,
    },
  },
  "& label.Mui-error.Mui-focused": {
    color: theme.palette.error.light,
  },

  // checkbox style
  "& .MuiCheckbox-root": {
    color: theme.palette.success.light,
  },
  "& .Mui-checked": {
    color: theme.palette.success.main,
  },

  // forgot link style
  "& a": {
    color: theme.palette.success.main,
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.success.light,
    },
  },

  // button style
  "& .MuiButton-contained": {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    textTransform: "capitalize",
    padding: theme.spacing(1.25),
    boxShadow: `rgb(0 171 85 / 24%) 0px 8px 16px 0px`,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      boxShadow: "none",
    },
  },
}));

const FormLogin = () => {
  const general = useGeneral();

  const [showPassword, setShowPassord] = useState(false);
  const [remember, setRemember] = useState(true);

  const [userid, setuserid] = useState("");
  const [password, setpassword] = useState("");
  const [click, setclick] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const [message, setmessage] = useState("");

  const handleTogglePassword = () => setShowPassord(!showPassword);
  const handleToggleRemember = () => setRemember(!remember);
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberUser: true,
    },
  });

  // prevent Default
  const preventDefault = (e) => e.preventDefault();

  // form submit


  const handlepass = (e) => {
    const value=e.target.value;
    setpassword(value);
    setError('');
    if (value.length < 2) {
      setError('Password should be at least 6 characters long.');
    }else {
      setError('');
    }
    console.log(value)
  };


  const handleid = (e) => {
    setuserid(e.target.value);

  };

  const onSubmit = (data) => {
    console.table(data);
    alert(JSON.stringify(data));
  };

  const handlelog = async () => {
    setclick(true);

  };


  useEffect(() => {

    const fetchLogin = async () => {
      const res = await axios
        .post("http://localhost:8080/api/login", {
          id: userid,
          password: password,
        }).then((resp)=>{
          return resp.data
        }).catch((err) => {
          console.log(err);
          setmessage("error");
        })
        if (res) {
          console.log(res)
          general.setLogin(true)
          let currentUser = { 
            faculty: res.user.faculty,
            name: res.user.name,
            email: res.user.email,
            phone: res.user.phone,
            type: res.user.type,
            id: res.user.id,
          }
          general.setCurrent(currentUser)
          console.log(currentUser)
          console.log(res)
          sessionStorage.setItem("token",res.token);

        }
    };
    

    if (click) {
      fetchLogin();
      setclick(false);
    }

  }, [click]);

  // for reset
  // couldn't make it work
  if (message==="ok" ||general.login) {
    // Redirect the user to the main page
    return <Redirect to="/dashboard" />;
  }
  return (

    
    <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
      {message === "error" &&  (
          <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          border={1}
          borderColor='#FF9999'
          borderRadius={4}
          bgcolor="error.light"
          color="error.contrastText"
          p={2}
        >
          <Typography variant="body1" component="span" sx={{color:"#d42d0f"}}  style={{ fontWeight: 'bold'  }}>
            اطلاعات صحیح نمیباشد
          </Typography>
        </Box>
    )}


      <TextField
       dir="rtl"

        variant="outlined"
        fullWidth
        label="شماره کاربری"
        onChange={handleid}

      />

      {/* Password */}
      <TextField
      type={showPassword ? 'text' : 'password'}
      variant="outlined"
      dir="rtl"
      error={Boolean(error)}
      helperText={error}
      onChange={handlepass}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="start">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
        label="رمز عبور"
       
      
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              className="ckbox"
              checked={remember}
              onChange={handleToggleRemember}
            />
          }
          label="مرا به یاد داشته باش"
          {...register("rememberUser")}
        />

        <Link href="#" onClick={preventDefault} underline="always">
         رمز عبور خود را فراموش کرده اید?
        </Link>
      </Box>

      <Button type="submit" variant="contained" disableElevation  onClick={handlelog}>
        ورود
      </Button>

    
      
    </FormStyle>
  );
};

export default FormLogin;
