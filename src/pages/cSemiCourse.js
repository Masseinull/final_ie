import { Typography, Link, Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import AuthButtonGroup from "../components/AuthPages/ButtonGroup";
import FormRegister from "../components/AuthPages/FormRegister";
import LeftPanel from "../components/AuthPages/LeftPanel";
import SectionDivider from "../components/AuthPages/SectionDivider";
import FormcSCourse from "../components/AuthPages/FormcSCourse"
// img
import RegisterPhoto from "../images/register.png";

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

const PanelStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",

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

  "& .terms": {
    display: "block",
    marginTop: "24px !important",
    fontSize: 12,
    textAlign: "right",

    "& a": {
      textDecorationColor: theme.palette.success.light,
      "&:hover": {
        textDecorationColor: theme.palette.common.black,
      },
    },
  },
}));

const CreateSemiCourse = () => {
  const preventDefault = (e) => e.preventDefault();

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Register | MUI Dash</title>
      </Helmet>


        <PanelStyle>


          <Container maxWidth="xs" className="form_Container">
            <Typography align="center" gutterBottom={true} variant="h4">اضافه کردن درس ترمی جدید</Typography>
            <Typography paragraph color="textSecondary">
            تمامی فیلد های اجباری را وارد کنید
            </Typography>


            {/* Section Divider */}
            <SectionDivider />

            {/* The Actual Form 👇 */}
            <FormcSCourse />

            {/* Terms */}
            <Typography  paragraph color="textSecondary" className="terms">
              در وارد کردن اطلاعات دقت کنید
            </Typography>
          </Container>
        </PanelStyle>

    </>
  );
};

export default CreateSemiCourse;
