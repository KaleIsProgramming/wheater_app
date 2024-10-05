import styled from "@emotion/styled";
import axios from "axios";
import { motion } from "framer-motion";
import { useState , useEffect} from "react";

export const MainWrapper = () => {
    const [data, setData] = useState({});
    const [inputValue, setInputValue] = useState('');

    if(inputValue != '') {
        axios.get(process.env.REACT_APP_WEATHER_API_URL + '/current.json', {
            params: {
                key:process.env.REACT_APP_WEATHER_API_KEY,
                q:'Paris'
            }
        }).then((data:any) => {
            setData(data.data)
        });
    }
    
    return(
        <StyledMainWrapper>
            <Header>Check Your Wheather Now!!!</Header>
            <>
                <input type="text" onChange={(e: any) => setInputValue(e.target.value)}/>
                <input type="button" defaultValue={'Search'}/>
            </>
        </StyledMainWrapper>
    );
};


const StyledMainWrapper = styled.div`
    height: 80%;
    width: 50%;
    border-radius: 20px;
    background: white;
`;

const Header = styled.h1`
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;