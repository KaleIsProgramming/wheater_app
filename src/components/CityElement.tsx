import { FC } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const CityElement:FC<any> = ({data}) => {
    
    return(
        <StyledElement>
            <LeftDataContainer>
                <IconContainer>
                    <img src={data.current.condition.icon} alt="weather icon" />
                </IconContainer>
                <Condition>
                    {data.current.condition.text}
                </Condition>
            </LeftDataContainer>
            <RightDataContainer>
                <Location>{data.location.country}-{data.location.name}</Location>
                <Temperature>temp: {data.current.temp_c}C</Temperature>
                <AdditionalInfoContainer>{data.current.last_updated}</AdditionalInfoContainer>
            </RightDataContainer>
        </StyledElement>
    );
};

const StyledElement = styled.div`
    height: 25%;
    width: 100%;
    display: flex;
    border-bottom: 1px solid black;
`;

const LeftDataContainer = styled.div`
    width: 30%;
    height: 100%;
`;

const IconContainer = styled.div`
    height: 70%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;  
    img {
        height: 90%;
        margin-top: 10%;
    }
`;

const Condition = styled.div`
    height: 30%;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const RightDataContainer = styled.div`
    height: 100%;
    width: 70%;

    div {
        height: 30%;
        max-width: 100%;
        display: flex;
        align-items: end;
    }
`;

const Location = styled.div`

`;

const Temperature = styled.div`

`;

const AdditionalInfoContainer = styled.div`

`;