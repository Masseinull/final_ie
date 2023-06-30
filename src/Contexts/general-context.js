import React,{useContext,useState,useEffect} from "react";
import axios from "axios";
export const GeneralContext = React.createContext()
export const useGeneral =()=> useContext(GeneralContext)

const GeneralProvider = ({children})=>{
    const TermData = [
        {name: "4012",status:"current"},
      ]
    const [login,setLogin]= useState(false)
    const [theme,setTheme]= useState("light")
    const [faculties, setFaculties] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/admin/faculties`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then((response) => {
            console.log(response.data)
            setFaculties(response.data)
        })
    }, []);

    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/admin/Professors`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then((response) => {
            console.log(response.data)
            setTeachers(response.data)
        })
    }, []);
    const daysOptions = [
        { label: 'شنبه - دوشنبه', value: ['Monday', 'Wednesday'] },
        { label: 'یکشنبه - سه شنبه', value: ['Tuesday', 'Thursday'] }
    ];
    // const daysOptions = [
    //     { label: 'شنبه - دوشنبه', value: ['Monday', 'Wednesday'] },
    //     { label: 'یکشنبه - سه شنبه', value: ['Tuesday', 'Thursday'] },
    //     // Add more options as needed
    //   ];
      
      const timesOptions = [
        { label: '9am - 11am', value: [9.11] },
        { label: '1pm - 3pm', value: [1,3] },
        // Add more options as needed
      ];
    const [current,setCurrent] = useState("")
    const valueObject ={
        login,
        setLogin,
        theme,
        faculties,
        setFaculties,
        teachers,
        setTeachers,
        current,
        setCurrent,
        TermData,
    }

    const checkValueLogin=()=>{
        let token = localStorage.getItem('token');
        if(token){
            setLogin(true)
        }else{
            setLogin(false)
        }
    }

    useEffect(()=>{
        checkValueLogin()
    },[])

    return (
        <GeneralContext.Provider value={valueObject}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralProvider