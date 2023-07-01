import {useState,useEffect} from "react";
import { Button } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useGeneral } from "../../Contexts/general-context";
import { Redirect } from 'react-router-dom';
import { TermData, createTermData } from "../../api/termApi";
import { useHistory } from 'react-router';


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

const FormCreateTerm = () => {
  let history = useHistory();
  const general = useGeneral();
  const [term, setTerm] = useState('');
  const [click, setclick] = useState(false);
  
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      term_id: "",
    },
  });
  const postData = () => {
    axios.post(`https://localhost:8080/api/term`, {
        term_id : term,
        current_term: false
    }).then(() => {
        history.push('/term')
    })
}
  return (
    <FormStyle component="form"  >

      {/* term_id */}
      <TextField
        variant="outlined"
        fullWidth
        type="number"
        label="شماره ترم"
        onChange={(e) => setTerm(e.target.value)}
      />

      {/* submit */}
      <Button type="submit" variant="contained" onClick={postData} disableElevation>
        ثبت
      </Button>
    </FormStyle>
  );
};

export default FormCreateTerm;
