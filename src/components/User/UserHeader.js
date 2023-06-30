import { Button, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import { BiPlus } from "react-icons/bi";

// style
const BoxStyle = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(2)}px 0`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "& .MuiTypography-root": {
    fontSize: 30,
    fontWeight: 500,
  },

  "& .MuiButton-root": {
    fontSize: 10,
    fontWeight: 600,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
    boxShadow: theme.shadows[5],

    "&:hover": {
      boxShadow: "none",
    },
  },
}));

const UserHeader = ({title,button,link}) => {
  return (
    <BoxStyle>
      <Typography variant="h3">{title}</Typography>

      {/*<Button href={link} variant="contained" disableElevation startIcon={<BiPlus />}>*/}
      {/* {button}*/}
      {/*</Button>*/}
    </BoxStyle>
  );
};

export default UserHeader;
