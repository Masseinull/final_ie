import { Button, IconButton, InputAdornment } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState , useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axios from "axios";
import { Redirect } from 'react-router-dom';

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

  // Button style
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

const FormCreateMainCourse = () => {
  const [id, setid] = useState("");
  const [pre_req_first, setpre_req_first] = useState();
  const [pre_req_second, setpre_req_second] = useState();
  const [co_req_first, setco_req_first] = useState();
  const [co_req_second, setco_req_second] = useState();
  const [credit, set_credit] = useState("");
  const [field, set_field] = useState("");
  const [click, setclick] = useState(false);
  const [successful, set_successful] = useState(false);
  const [co_req, setco_req] = useState([]);
  const [pre_req, setpre_req] = useState([]);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });


  useEffect(() => {

    const fetchCourse = async () => {
      const res = await axios
        .post("http://localhost:8080/api/course",
         {
        courseType : "general",
        _id: id,
        pre_required: pre_req,
        co_required: co_req,
        credit: credit,
        field: field
        },{headers: {Authorization : `Bearer ${sessionStorage.getItem("token")}`
      }}).then((resp)=>{
          return resp.data
        }).catch((err) => {
          console.log(err);
        })
        if (res) {
          set_successful(true);
          console.log(res);

        }
    };
    

    if (click) {
     
      fetchCourse();
      setclick(false);
    }

  }, [click]);
  

  // submit
  const onSubmit = (data) => {

    
    console.table(data);
    alert("userData: " + JSON.stringify(data));
  };

  const handleid = (e) => {
    setid(e.target.value);

  };
  const handlepre_req_first = (e) => {
    setpre_req_first(e.target.value);

  };
  const handlepre_req_second = (e) => {
    setpre_req_second(e.target.value);

  };
  const handleco_req_first = (e) => {
    setco_req_first(e.target.value);

  };
  const handleco_req_second = (e) => {
    setco_req_second(e.target.value);

  };
  const handlecredit = (e) => {
    set_credit(e.target.value);

  };
  const handlefield = (e) => {
    set_field(e.target.value);

  };
  const handleclick = (e) => {
    console.log(field);
    console.log(id);
    console.log(pre_req_first);
    if(co_req_first){
      setco_req(co_req.push(co_req_first));
      }
    if(co_req_second){
        setco_req(co_req.push(co_req_second));
      }
      if(pre_req_first){
        setco_req(pre_req.push(pre_req_first));
        }
      if(pre_req_second){
          setco_req(pre_req.push(pre_req_second));
        }

    setclick(true);

  };
  if (successful) {
    // Redirect the user to the main page
    return <Redirect to="/mainCourse" />;
    return <Redirect to="/" />;
  }

  return (
    <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Names box */}


      {/* email */}
      <TextField
        variant="outlined"
        fullWidth
        onChange={handleid}
        label="شماره درس"
    
      />

<Box
        sx={{
          display: "grid",
          gap: { xs: 3, sm: 2 },
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          onChange={handlepre_req_second}

          label="پیش نیاز 2"
       
        />

        <TextField
          variant="outlined"
          fullWidth
          onChange={handlepre_req_first}

          label="پیش نیاز 1"
       
        />
            <TextField
          variant="outlined"
          fullWidth
          onChange={handleco_req_second}

          label=" هم نیاز2"
   
        />

        <TextField
          variant="outlined"
          fullWidth
          type="text"
          onChange={handleco_req_first}

          label="هم نیاز1"
       
        />
      </Box>  
      {/* password */}
      <TextField
        variant="outlined"
        fullWidth
        onChange={handlecredit}

        label="واحد"
    
      />

      <TextField
        variant="outlined"
        fullWidth
        onChange={handlefield}

        label="رشته"
        
      />
   

      {/* submit */}
      <Button type="submit" variant="contained" disableElevation onClick={handleclick}>
        ثبت
      </Button>
    </FormStyle>
  );
};

export default FormCreateMainCourse;
