import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {ILoaderProps} from "@/types";


export const Loader: React.FC<ILoaderProps> = ({loading}) => {
    return (
        <div>
            <Backdrop
                sx={(theme) => ({color: '#fff', zIndex: 20})}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
}