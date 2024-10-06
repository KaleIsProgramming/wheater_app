import styled from "@emotion/styled";
import axios from "axios";
import { motion } from "framer-motion";
import { useState , useEffect} from "react";
import { CityElement } from "./CityElement";

export const MainWrapper = () => {
    const [searchData, setSearchData] = useState<any>({});
    const [localizationData, setLocalizationData] = useState<any>({});
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

        
    useEffect(() => {
        if(inputValue != '') {
            axios.get(process.env.REACT_APP_WEATHER_API_URL + '/search.json', {
                params: {
                    key:process.env.REACT_APP_WEATHER_API_KEY,
                    q:inputValue
                }
            }).then((data:any) => {
                setSearchData(data.data)
                //console.log(searchData)
            });
        }
    },[inputValue])
    
    const onLoseFocusHandler = () => {
        if(searchData[0]) {
            let isEqual = false;
            searchData.forEach((element: any) => {
                if(element.name.toLowerCase() == inputValue.toLowerCase()) {
                    isEqual = true
                    setInputValue(element.name)
                    return
                } 
            });
            if(!isEqual) {
                setInputValue(searchData[0].name)
            }
            
        } else {
            setInputValue('')
        }
        
    }

    useEffect(() => {
        if(searchData[0]) {
            let tempDataStorage:any = [];
            let filtredSearchData:any = [];
            for(let i = 0; i < searchData.length-1; i++) {
                let isCopy = false;
                for(let j = 0; j < searchData.length-1; j++) {
                    if(j == 0) {
                        isCopy = false;
                    }
                    if(searchData[i].name == searchData[j].name && i != j){
                        isCopy = true;
                    } 
                }
                if(!isCopy) {
                    filtredSearchData.push(searchData[i])
                    console.log(filtredSearchData)
                }
            }
            filtredSearchData.forEach((element: any) => {
                
                axios.get(process.env.REACT_APP_WEATHER_API_URL + '/current.json', {
                    params: {
                        key:process.env.REACT_APP_WEATHER_API_KEY,
                        q:element.name
                    }
                }).then((data:any) => {
                    tempDataStorage.push(data.data)
                    setLocalizationData(tempDataStorage);
                });
            });
        }
    },[searchData]);

    console.log(searchData)
    console.log(localizationData[0])


    return(
        <StyledMainWrapper>
            <Header>Check Your Wheather Now!!!</Header>
            <SearchContainer>
                <input type="text" placeholder="Search..." value={inputValue} onBlur={() => onLoseFocusHandler()} onChange={(e: any) => setInputValue(e.target.value)}/>
            </SearchContainer>
            <LocationsList>
                {
                localizationData[0] ? localizationData.map((data:any, index:any) => {
                    return <CityElement data={data}/>
                })
                : <></>
                }
            </LocationsList>
        </StyledMainWrapper>
    );
    

};


const StyledMainWrapper = styled.div`
    height: 80%;
    width: 50%;
    border-radius: 20px;
    background: white;

    @media screen and (max-width: 880px){
        width: 100%;
        height: 100%;
        border-radius: 0px;
    }
`;

const Header = styled.h1`
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 50px;
`;

const SearchContainer = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;

    input:first-of-type {
        margin-left: 50px;
    }
`;

const LocationsList = styled.div`
    height: 70%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
`;