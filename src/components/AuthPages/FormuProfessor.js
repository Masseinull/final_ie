import {Button, IconButton, InputAdornment} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {TextField} from "@mui/material";
import {Box} from "@mui/system";
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {RiEyeFill, RiEyeOffFill} from "react-icons/ri";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useGeneral} from "../../Contexts/general-context";
import axios from "axios";
// style
const FormStyle = styled("form")(({theme}) => ({
    // root style
    marginTop: theme.spacing(2),
    display: "grid",
    gap: theme.spacing(2),

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

const FormUpdateProfessor = () => {
    const general = useGeneral();

    const [showPassword, setShowPassord] = useState(false);
    const handleTogglePassword = () => setShowPassord(!showPassword);
    const [name, setName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setemail] = useState('');
    const [pass, setPass] = useState('');
    const [phone, setPhone] = useState('');
    const [click, setclick] = useState(false);
    const [successful, set_successful] = useState(false);
    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log(event.target.value)

    };
    const handleLnameChange = (event) => {
        setLName(event.target.value);
        console.log(event.target.value)

    };
    const handleEmailChange = (event) => {
        setemail(event.target.value);
        console.log(event.target.value)

    };
    const handlePassChange = (event) => {
        setPass(event.target.value);
        console.log(event.target.value)

    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        console.log(event.target.value)

    };
    // hook form
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
    });

    // submit
    const onSubmit = (data) => {
        console.table(data);
        alert("userData: " + JSON.stringify(data));
    };
    const handleCreateStudent = async () => {
        setclick(true);
    };

    useEffect(() => {
        const fetchUpdateProf = async () => {
            console.log("name:" + name + " " + lname +
                "password:" + pass +
                "email: " + email +
                " \nphone: " + phone)
            const res = await axios
                .put("http://localhost:8080/api/Professor",
                    {
                        name: name + " " + lname,
                        password: pass,
                        email: email,
                        phone: phone

                    }, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`
                        }
                    }).then((resp) => {
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

            fetchUpdateProf();
            setclick(false);
        }

    }, [click]);

    return (

        <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Names box */}
            <Box
                sx={{
                    display: "grid",
                    gap: {xs: 3, sm: 2},
                    gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr"},
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="نام"
                    onChange={handleNameChange}

                />

                <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="نام خانوداگی"
                    onChange={handleLnameChange}

                />
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gap: {xs: 3, sm: 2},
                    gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr"},
                }}
            >
                {/* email */}
                <TextField
                    variant="outlined"
                    fullWidth
                    onChange={handleEmailChange}
                    label="آدرس ایمیل"

                />
                {/* password */}
                <TextField
                    variant="outlined"
                    fullWidth
                    onChange={handlePassChange}
                    type="text"
                    label="رمزعبور"
                />

            </Box>



                <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="شماره موبایل"
                    onChange={handlePhoneChange}

                />






            {/* submit */}
            <Button type="submit" variant="contained" disableElevation onClick={handleCreateStudent}>
                ثبت
            </Button>
        </FormStyle>
    );
};

export default FormUpdateProfessor;
