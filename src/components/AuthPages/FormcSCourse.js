import {Button, IconButton, InputAdornment} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {TextField} from "@mui/material";
import {Box} from "@mui/system";
import {useState, useEffect} from "react";
import {set, useForm} from "react-hook-form";
import {RiEyeFill, RiEyeOffFill} from "react-icons/ri";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
// import {useGeneral} from "../../Contexts/general-context";


// style
const FormStyle = styled("form")(({theme}) => ({
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
    // const general = useGeneral();
    // const TeacherOptions = general.teachers;
    const daysOptions = [
        {id: [3, 5], value: 'دوشنبه - چهارشنبه'},
        {id: [4, 6], value: 'پنجشنبه - سه شنبه'},
        {id: [2, 4], value: 'یکشنبه - سه شنبه'},
        {id: [1, 3], value: 'شنبه - دو شنبه'},
        {id: [4], value: 'سه شنبه'},
        {id: [1], value: 'شنبه'},
        {id: [3], value: 'دو شنبه'},
        {id: [5], value: 'چهارشنبه'},
        {id: [2], value: 'یک شنبه'},
    ];

    const timesOptions = [
        {id: [7, 9], value: '7am - 9am'},
        {id: [9, 11], value: '9am - 11am'},
        {id: [13, 15], value: '1pm - 3pm'},
        {id: [15, 17], value: '3pm - 5pm'},
    ];

    const examDaysOptions = [
        {id: [1], value: 'روز اول'},
        {id: [2], value: 'روز دوم'},
        {id: [3], value: 'روز سوم'},
        {id: [4], value: 'روز چهارم'},
        {id: [5], value: 'روز پنجم'},
        {id: [6], value: 'روز ششم'},
        {id: [7], value: 'روز هفتم'},
        {id: [8], value: 'روز هشتم'},
        {id: [9], value: 'روز نهم'},
        {id: [10], value: 'روز دهم'},
        {id: [11], value: 'روز یازدهم'},
        {id: [12], value: 'روز دوازدهم'},
        {id: [13], value: 'روز سیزدهم'},
        {id: [14], value: 'روز چهاردم'},
    ];


    const [id, setid] = useState("");
    const [generalCourse, setgeneralCourse] = useState("");
    const [classTime, setclassTime] = useState([]);
    const [examTime, setexamTime] = useState([]);
    const [examLocation, setexamLocation] = useState("");
    const [teacher, setteacher] = useState("");
    const [semester, setsemester] = useState("");
    const [click, setclick] = useState(false);
    const [successful, set_successful] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [selectedExamDays, setSelectedExamDays] = useState([]);
    const [selectedExamTimes, setSelectedExamTimes] = useState([]);

    // hook form
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {},
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                let formattedClassTime = [];
                if (selectedDays.length === 2) {
                    // If class is 2 times a week
                    formattedClassTime = [
                        `${selectedDays[0]}`, `${selectedDays[1]}`,
                        `${selectedTimes[0]}`, `${selectedTimes[1]}`,
                    ];
                } else if (selectedDays.length === 1) {
                    // If class is once a week
                    formattedClassTime = [`${selectedDays[0]}`, `${selectedTimes[0]}`, `${selectedTimes[1]}`];
                }
                let formattedExamTime = [];
                formattedExamTime = [`${selectedExamDays[0]}`, `${selectedExamTimes[0]}``${selectedExamTimes[1]}`];


                const response = await axios.post(
                    'http://localhost:8080/api/course',
                    {
                        courseType: 'semester',
                        _id: id,
                        general_course: generalCourse,
                        class_time: formattedClassTime,
                        exam_time: formattedExamTime,
                        exam_location: examLocation,
                        semester: semester,
                        teacher: teacher,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        },
                    }
                );

                const data = response.data;
                set_successful(true);
                console.log(data);
            } catch (error) {
                console.log(error);
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

    const handleDaysChange = (event) => {
        setSelectedDays(event.target.value);
    };

    const handleTimesChange = (event) => {
        setSelectedTimes(event.target.value);
    };
    const handleExamDaysChange = (event) => {
        setSelectedExamDays(event.target.value);
    };

    const handleExamTimesChange = (event) => {
        setSelectedExamTimes(event.target.value);
    };
    const handleid = (e) => {
        setid(e.target.value);

    };
    const handlegenralCourse = (e) => {
        setgeneralCourse(e.target.value);

    };
    const handleclassTime = (e) => {
        setclassTime(e.target.value);

    };
    const handleexamTime = (e) => {
        setexamTime(e.target.value);

    };
    const handleexamLocation = (e) => {
        setexamLocation(e.target.value);

    };
    const handleteacher = (e) => {
        setteacher(e.target.value);

    };
    const handlesemester = (e) => {
        setsemester(e.target.value);

    };
    const handleclick = (e) => {
        console.log(teacher);
        console.log(id);
        console.log(classTime);
        // if(co_req_first){
        //   setco_req(co_req.push(co_req_first));
        //   }
        // if(co_req_second){
        //     setco_req(co_req.push(co_req_second));
        //   }
        //   if(pre_req_first){
        //     setco_req(pre_req.push(pre_req_first));
        //     }
        //   if(pre_req_second){
        //       setco_req(pre_req.push(pre_req_second));
        //     }

        setclick(true);

    };
    if (successful) {
        // Redirect the user to the main page
        return <Redirect to="/mainCourse"/>;
    }

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
                    onChange={handlegenralCourse}

                    label="شناسه درس اصلی"

                />
                <TextField
                    variant="outlined"
                    fullWidth
                    onChange={handleid}
                    label="شماره درس"

                />
            </Box>
            <TextField
                select
                label="روز کلاس"
                value={selectedDays}
                onChange={handleDaysChange}
                fullWidth
                SelectProps={{
                    MenuProps: {
                        PaperProps: {
                            style: {
                                maxHeight: 200,
                            },
                        },
                    },
                }}
            >
                {daysOptions.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="ساعت کلاس"
                value={selectedTimes}
                onChange={handleTimesChange}
                fullWidth
            >
                {timesOptions.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={teacher}
                label="استاد درس"
                onChange={handleteacher}
            >

            </TextField>
            <TextField
                select
                label="روز امتحان"
                value={selectedExamDays}
                onChange={handleExamDaysChange}
                fullWidth
                SelectProps={{
                    MenuProps: {
                        PaperProps: {
                            style: {
                                maxHeight: 200,
                            },
                        },
                    },
                }}
            >
                {examDaysOptions.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="ساعت امتحان"
                value={selectedExamTimes}
                onChange={handleExamTimesChange}
                fullWidth
            >
                {timesOptions.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </TextField>


            <TextField
                variant="outlined"
                fullWidth
                type="text"
                onChange={handleexamLocation}

                label="مکان امتحان"

            />


            <TextField
                variant="outlined"
                fullWidth
                onChange={handlesemester}

                label="ترم"

            />

            {/* submit */}
            <Button type="submit" variant="contained" disableElevation onClick={handleclick}>
                ثبت
            </Button>
        </FormStyle>
    );
};

export default FormCreateMainCourse;
