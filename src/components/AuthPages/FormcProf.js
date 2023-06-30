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
const TeacherLevel = [
    {id: "Lecturer", name: "ارائه دهنده"},
    {id: "Associate Professor", name: "دانشیار"},
    {id: "Assistant Professor", name: "استادیار"},
    {id: "Professor", name: "استاد تمام"},
]
const FormCreateProf = () => {
    const general = useGeneral();
    const FacultyOptions = general.faculties;

    const [showPassword, setShowPassord] = useState(false);
    const handleTogglePassword = () => setShowPassord(!showPassword);
    const [major, setMajor] = useState('');
    const [faculty, setFaculty] = useState('');
    const [level, setLevel] = useState('');
    const [name, setName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setemail] = useState('');
    const [pass, setPass] = useState('');
    const [phone, setPhone] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [click, setclick] = useState(false);
    const [successful, set_successful] = useState(false);
    const handleMajorChange = (event) => {
        setMajor(event.target.value);
    };
    const handleFacultyChange = (event) => {
        setFaculty(event.target.value);
    };
    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };
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
    const handleTeacherIDChange = (event) => {
        setTeacherId(event.target.value);
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
            password: "",
            teacherNumber: "",
            faculty: "",
            major: "",
            phone: ""
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
        const fetchCreateProf = async () => {
            console.log("name:" + name + " " + lname +
                " _id:" + teacherId +
                "password:" + pass +
                "email: " + email +
                " \nphone: " + phone +
                "\nteaching_level:" + level, +
                " \n faculty: " + faculty +
                "\n field:" + major)
            const res = await axios
                .post("http://localhost:8080/api/admin/Professor",
                    {
                        name: name + " " + lname,
                        _id: teacherId,
                        password: pass,
                        email: email,
                        phone: phone,
                        level: level,
                        faculty: faculty,
                        field: major,

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

            fetchCreateProf();
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

                {/* student number */}
                <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    label="شماره پرسنلی استاد"
                    onChange={handleTeacherIDChange}
                    error={errors.teacherNumber ? true : false}
                    helperText={errors.teacherNumber && "شماره استادی معتبر وارد کنید"}
                />
            </Box>


            <Box
                sx={{
                    display: "grid",
                    gap: {xs: 3, sm: 2},
                    gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr"},
                }}
            >
                {/* password */}
                <TextField
                    variant="outlined"
                    fullWidth
                    onChange={handlePassChange}
                    type="text"
                    label="رمزعبور"
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="شماره موبایل"
                    onChange={handlePhoneChange}

                />
            </Box>



            <InputLabel dir="rtl" id="demo-simple-select-label">مرتبه استاد</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={level}
                label="مرتبه"
                onChange={handleLevelChange}
            >
                {TeacherLevel.map(option => {
                    return (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    )
                })}

            </Select>

            <InputLabel dir="rtl" id="demo-simple-select-label">رشته</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={major}
                label="رشته"
                onChange={handleMajorChange}

            >
                {FacultyOptions.map(option => {
                    return (
                        <MenuItem key={option.faculty_name} value={option.faculty_name}>
                            {option.faculty_name}
                        </MenuItem>
                    )
                })}
            </Select>

            <InputLabel dir="rtl" id="demo-simple-select-label">دانشکده</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={faculty}
                label="دانشکده"
                onChange={handleFacultyChange}

            >
                {FacultyOptions.map(option => {
                    return (
                        <MenuItem key={option.faculty_name} value={option.faculty_name}>
                            {option.faculty_name}
                        </MenuItem>
                    )
                })}

            </Select>
            {/* submit */}
            <Button type="submit" variant="contained" disableElevation onClick={handleCreateStudent}>
                ثبت
            </Button>
        </FormStyle>
    );
};

export default FormCreateProf;
