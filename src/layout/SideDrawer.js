import { Link } from "react-router-dom";
import {
  Hidden,
  styled,
  Toolbar,
  Drawer,
  List,
  Typography,
  Avatar,
  Box,
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

// icons & images
import userAvatar from "../images/avatar_default.png";
import { ImPieChart } from "react-icons/im";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import {
  RiBankFill,
  RiBookFill,
  RiLoginCircleFill,
  RiContactsBook2Fill
} from "react-icons/ri";

import { drawerWidth } from "./DashboardLayout";
import CustomListItem from "../components/Drawer/CustomListItem";
import { useGeneral } from "../Contexts/general-context";

const NavDrawerStyle = styled("nav")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

const LogoStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.green.darker,
  margin: 0,
}));

const UserCardStyle = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "inherit",
  backgroundColor: theme.palette.gray.light,
  margin: "12px",
  padding: "14px 12px",
  borderRadius: theme.spacing(1.5),
  textDecoration: "none",
  "& .MuiTypography-root": {
    marginLeft: theme.spacing(1.5),
  },
}));

const ListStyle = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const GetMoreStyle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.gray.lighter,
  margin: "40px 12px 16px",
  padding: "60px 12px 14px 12px",
  borderRadius: theme.spacing(1.5),
  textAlign: "center",
  position: "relative",

  "& img": {
    position: "absolute",
    top: 0,
    left: "50%",
    width: theme.spacing(12.5),
    transform: "translate(-40%, -40%)",
    transition: "all 0.3s ease-in",
  },
  "& h5": {
    margin: "10px 0",
  },
  "& a": {
    textDecoration: "none",
    fontWeight: 500,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.green.darker,
    display: "block",
    padding: "6px",
    borderRadius: "inherit",
    transition: "background 0.3s ease-in",
    boxShadow: "0px 5px 5px white",
    "&:hover": {
      backgroundColor: theme.palette.green.dark,
    },
  },

  "&:hover": {
    "& img": {
      transform: "translate(-40%, -50%)",
    },
  },
}));

// links for the side nav
const links = [
  { id: "L0", path: "/dashboard", icon: <ImPieChart />, title: "خانه",},
  { id: "L1", path: "/prof", icon: <FaUserFriends />, title: " اساتید" },
  { id: "L2", path: "/student", icon: <FaUserFriends />, title: " دانشجویان" },
  { id: "L3", path: "/manager", icon: <FaUserFriends />, title: " معاونین آموزشی" },
  { id: "L4", path: "/mainCourse", icon: <RiBookFill />, title: " دروس اصلی" },
  { id: "L5", path: "/semiCourse", icon: <RiContactsBook2Fill />, title: "دروس ترمی" },
  { id: "L6", path: "/faculty", icon: <RiBankFill />, title: "دانشکده ها",},
  { id: "L7", path: "/login", icon: <RiLoginCircleFill />, title: "ورود" },
  { id: "L9", path: "/preregister", icon: <FaUserPlus />, title: "پیش ثبت نام" },
  { id: "L10", path: "/register", icon: <FaUserPlus />, title: " ثبت نام" },
  { id: "L11", path: "/term", icon: <FaUserPlus />, title: "ترم" },
  { id: "L12", path: "/listPreReg", icon: <FaUserPlus />, title: "لیست پیش ثبت نام ها" },
  { id: "L13", path: "/listReg", icon: <FaUserPlus />, title: "لیست ثبت نام ها" },
  { id: "L14", path: "/myCourses", icon: <FaUserPlus />, title: "دروس من" },
  { id: "L15", path: "/myClasses", icon: <FaUserPlus />, title: "کلاس های من" },
  { id: "L16", path: "/myStudents", icon: <FaUserPlus />, title: "دانشجو های من" },

];

const SideDrawer = (props) => {
 const general = useGeneral();
  const is_login = general.login;

  let showLinks=[]
  if(is_login===true){
    const type = general.current.type;
    if(type==="admin"){
      showLinks.push(links[0])
      showLinks.push(links[1])
      showLinks.push(links[2])
      showLinks.push(links[3])
      showLinks.push(links[6])


    }else if(type==="educationalManager"){
      showLinks.push(links[0])
      showLinks.push(links[1])
      showLinks.push(links[4])
      showLinks.push(links[5])
      showLinks.push(links[6])
      showLinks.push(links[12])
      showLinks.push(links[13])

    }
    else if(type==="teacher"){
      showLinks.push(links[0])
      showLinks.push(links[2])
      showLinks.push(links[4])
      showLinks.push(links[5])
      showLinks.push(links[14])
      showLinks.push(links[15])

    }
    else if(type==="student"){
      showLinks.push(links[0])
      showLinks.push(links[4])
      showLinks.push(links[5])
      showLinks.push(links[8])
      showLinks.push(links[9])
      showLinks.push(links[13])
      
    }
  }else{
    console.log("we here")
    showLinks.push(links[7])

  }
  const drawerContent = (
    <>
      {/* Logo */}
      <Toolbar>
        <LogoStyle dir="center" variant="h6" component="h2">
          انتخاب واحد
        </LogoStyle>
      </Toolbar>

      {/* User Card */}
      {is_login ? <UserCardStyle to="/" onClick={props.onClose}>
        <Avatar src={userAvatar} alt="User Image" />

         <Typography variant="subtitle1" component="h3">
          {general.current.name} 
        </Typography>
      </UserCardStyle>:null}

      {/* List of links */}
      <ListStyle>
        {showLinks.map((el) => (
    
          <CustomListItem 
            key={el.id}
            path={el.path}
            icon={el.icon}
            title={el.title}
            onClick={props.onClose}
          />
        ))}
      </ListStyle>


    </>
  );

  return (
    <NavDrawerStyle aria-label="Navigation Panel">
      {/* Hidden 01 for sm size */}
      <Hidden smUp implementation="css">
        <Drawer
          container={props.container}
          variant="temporary"
          //anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.toggleMenu}
          onClose={props.onClose}
          classes={{ paper: props.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {/* Drawer Component */}
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Hidden 02 for big size*/}
      <Hidden xsDown implementation="css">
        <Drawer variant="permanent" open classes={{ paper: props.drawerPaper }}>
          {drawerContent}
        </Drawer>
      </Hidden>
    </NavDrawerStyle>
  );
};

export default SideDrawer;
