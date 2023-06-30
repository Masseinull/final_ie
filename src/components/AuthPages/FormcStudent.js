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
const StudentLevelOptions = [
    {id: "BS", name: "کارشناسی"},
    {id: "MS", name: "کارشناسی ارشد"},
    {id: "PhD", name: "دکتری"},
]
const FormCreateStudent = () => {
    const general = useGeneral();
    const FacultyOptions = general.faculties;
    const TeacherOptions = general.teachers;

    const [showPassword, setShowPassord] = useState(false);
    const handleTogglePassword = () => setShowPassord(!showPassword);
    const [major, setMajor] = useState('');
    const [faculty, setFaculty] = useState('');
    const [level, setLevel] = useState('');
    const [term, setTerm] = useState('');
    const [name, setName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setemail] = useState('');
    const [pass, setPass] = useState('');
    const [phone, setPhone] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [gpa, setGpa] = useState('');
    const [year, setYear] = useState('');
    const [studentId, setStudentId] = useState('');
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
    const handleTermChange = (event) => {
        setTerm(event.target.value);
        console.log(event.target.value)

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
    const handleStudentIDChange = (event) => {
        setStudentId(event.target.value);
        console.log(event.target.value)

    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        console.log(event.target.value)

    };
    const handleGPAChange = (event) => {
        console.log(event.target.value)
        setGpa(event.target.value);
    };
    const handleSupervisorChange = (event) => {
        console.log(event.target.value)
        setSupervisor(event.target.value);
    };
    const handleYearChange = (event) => {
        setYear(event.target.value);
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
            studentNumber: "",
            faculty: "",
            major: "",
            enrtyYear: "",
            entrySemester: "",
            phone: "",
            gpa: "",
            term: "",
            supervisor: ""
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
        const fetchCreateStudent = async () => {
            console.log("name:" + name + " " + lname +
                " _id:" + studentId +
                "password:" + pass +
                "email: " + email +
                " \nphone: " + phone +
                "\nstudy_level:" + level, +
                    "\nentry_year:" + year +
                "\nentry_semester:" + term +
                "\nsupervisor:" + supervisor +
                "\n GPA: " + gpa +
                " \n faculty: " + faculty +
                "\n field:" + major)
            const res = await axios
                .post("http://localhost:8080/api/admin/student",
                    {
                        name: name + " " + lname,
                        _id: studentId,
                        password: pass,
                        email: email,
                        phone: phone,
                        study_level: level,
                        entry_year: year,
                        entry_semester: term,
                        GPA: gpa,
                        supervisor: supervisor,
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

            fetchCreateStudent();
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
                    label="شماره دانشجویی"
                    onChange={handleStudentIDChange}
                    error={errors.studentNumber ? true : false}
                    helperText={errors.studentNumber && "شماره دانشجویی معتبر وارد کنید"}
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
                {/*  Enrty Year */}
                <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    label="سال ورود"
                    onChange={handleYearChange}
                    error={errors.entryYear ? true : false}
                    helperText={errors.entryYear && "سال ورود معتبر وارد کنید"}
                />
            </Box>


            <Box
                sx={{
                    display: "grid",
                    gap: {xs: 5, sm: 2},
                    gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr"},
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="معدل"
                    onChange={handleGPAChange}

                />

                <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="شماره موبایل"
                    onChange={handlePhoneChange}

                />

            </Box>
            <InputLabel dir="rtl" id="demo-simple-select-label">استاد راهنما</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={supervisor}
                label="استاد راهنما"
                onChange={handleSupervisorChange}
            >
                {TeacherOptions.map(option => {
                    return (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    )
                })}

            </Select>
            <InputLabel dir="rtl" id="demo-simple-select-label">مقطع</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={level}
                label="مقطع"
                onChange={handleLevelChange}
            >
                {StudentLevelOptions.map(option => {
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
            <TextField
                variant="outlined"
                fullWidth
                type="number"
                label="ترم ورود"
                onChange={handleTermChange}
                error={errors.entrySemester ? true : false}
                helperText={errors.entrySemester && "ترم ورود معتبر وارد کنید"}
            />
            {/* submit */}
            <Button type="submit" variant="contained" disableElevation onClick={handleCreateStudent}>
                ثبت
            </Button>
        </FormStyle>
    );
};

export default FormCreateStudent;
