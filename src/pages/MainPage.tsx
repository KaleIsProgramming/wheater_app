import styled from "@emotion/styled";
import { MainWrapper } from "../components";

export const MainPage = () => {

    return(
        <StyledMainPage>
            <MainWrapper />
        </StyledMainPage>
    );
};


const StyledMainPage = styled.div`
    height: 100vh;
    width: 100vw;  
    display: flex;
    align-items: center;
    justify-content: center;
`;