import { Container, useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import UserHeader from "../components/User/UserHeader";
import UserTable from "../components/User/UserTable";
import FacultyList from "../components/Faculty/FacultyList";

// box style
const BoxStyle = styled(Box)(({ theme }) => ({
    margin: `${theme.spacing(4)}px auto`,
    borderRadius: theme.spacing(2),
    boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px`,
    overflow: "hidden",

    //border: "2px solid teal",
}));

const Faculty = () => {


    // media queries
    const less400 = useMediaQuery("(max-width:400px)");
    const less480 = useMediaQuery("(max-width:480px)");
    const less600 = useMediaQuery("(max-width:600px)");
    const less768 = useMediaQuery("(max-width:768px)");

    return (
        <>
            <Helmet>
                <title>دانشکده‌ها | انتخاب واحد</title>
            </Helmet>

            <Container maxWidth="lg" disableGutters>
                {/* User Header */}
                <UserHeader title={"دانشکده‌ها"} button={"دانشکده جدید"} link={"/cFaculty"} />

                {/* User Table */}

                <BoxStyle
                    sx={{
                        width: less400
                            ? 300
                            : less480
                                ? 360
                                : less600
                                    ? 540
                                    : less768
                                        ? 440
                                        : "100%",
                    }}
                >
                    <FacultyList />
                </BoxStyle>
            </Container>
        </>
    );
};

export default Faculty;
