import { Container, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Helmet } from "react-helmet";

// components
import UserHeader from "../components/User/UserHeader";
import LeftPanel from "../components/AuthPages/LeftPanel";
import RegisterImg from "../images/register.png";

// style
const ContainerStyle = styled(Container)(({ theme }) => ({
    padding: 0,
    paddingTop: theme.spacing(2),

}));

const Home = () => {
    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>  خانه |انتخاب واحد</title>
            </Helmet>


            {/* main container */}
            <ContainerStyle maxWidth="lg">
                {/* Header */}
                <UserHeader />
                <LeftPanel
                    flexDirectio="center"
                    title="به سامانه انتخاب واحد خوش آمدید"
                    text="center"
                    img={RegisterImg}
                    imgAlt="Home Image"
                />


            </ContainerStyle>
        </>
    );
};

export default Home;
