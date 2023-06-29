import { Typography, Link, Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import AuthButtonGroup from "../components/AuthPages/ButtonGroup";
import FormLogin from "../components/AuthPages/FormLogin";
import LeftPanel from "../components/AuthPages/LeftPanel";
import SectionDivider from "../components/AuthPages/SectionDivider";

// img
import LoginPhoto from "../images/auth/login.png";

// styles
const ContainerBoxStyle = styled(Box)(({ theme }) => ({
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight * 2}px)`,
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: `350px 1fr`,

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: `1fr`,
  },
}));

const RightPanelStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  "& .account_switch": {
    textAlign: "right",
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(8),
    "& .MuiLink-underlineNone	": {
      color: theme.palette.green.darker,
      fontWeight: 500,
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(1.5),
    },
  },

  "& .form_Container": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    "& .MuiTypography-h4": {
      fontSize: 25,
      fontWeight: 500,
    },
    "& .MuiTypography-paragraph": {
      margin: "8px 0 20px 0",
    },
  },
}));

const Login = () => {





  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>ورود | انتخاب واحد</title>
      </Helmet>

      <ContainerBoxStyle container>
        <LeftPanel
          flexDirectio="center"
          title="به سامانه انتخاب واحد خوش آمدید"
          img={LoginPhoto}
          imgAlt="Login Image"
        />

        <RightPanelStyle>

          <Container maxWidth="xs" className="form_Container">
            <Box dir="rtl">
            <Typography variant="h4" >ورود به سامانه انتخاب واحد</Typography>
            <Typography paragraph color="textSecondary">
              اطلاعات خود را وارد نمایید.
            </Typography>
            </Box>



            {/* Section Divider */}
            <SectionDivider />

            {/* The Actual Form 👇 */}
            <FormLogin />
          </Container>
        </RightPanelStyle>
      </ContainerBoxStyle>
    </>
  );
};

export default Login;
