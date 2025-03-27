import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps{
    loading: boolean;
}
export const Loader: React.FC<LoaderProps> = ({loading}) => {
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