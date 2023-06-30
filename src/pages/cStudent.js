import { Typography, Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import FormRegister from "../components/AuthPages/FormRegister";
import SectionDivider from "../components/AuthPages/SectionDivider";
import FormCreateStudent from "../components/AuthPages/FormcStudent";



const PanelStyle = styled(Box)(({ theme }) => ({
  display: "flex",

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
    flex: 10,
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

const CreateStudent = () => {
  const preventDefault = (e) => e.preventDefault();

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>دانشجوی جدید | سامانه انتخاب واحد</title>
      </Helmet>


        <PanelStyle>


          <Container maxWidth="md" className="form_Container">
            <Typography align="center" gutterBottom={true} variant="h4">اضافه کردن دانشجو جدید</Typography>
            <Typography align="center" paragraph color="textSecondary">
            تمامی فیلد های اجباری را وارد کنید
            </Typography>


            {/* Section Divider */}
            <SectionDivider />

            {/* The Actual Form 👇 */}
            <FormCreateStudent />

            {/* Terms */}
            <Typography  paragraph color="textSecondary" className="terms">
              در وارد کردن اطلاعات دقت کنید
            </Typography>
          </Container>
        </PanelStyle>

    </>
  );
};

export default CreateStudent;
