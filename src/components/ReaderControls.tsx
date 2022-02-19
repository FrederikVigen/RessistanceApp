import { Box, Button, FormControlLabel, Slider, Stack, Typography } from '@mui/material'
import React from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useReaderService } from '../Services/ReaderService';
import { useTextService } from '../Services/TextService';

const ReaderControls = () => {
    const readerService = useReaderService()
    const textSerivice = useTextService()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        readerService.readText([textSerivice.currentText[0]])
    }

    const handleRateChange = (e : Event, value: number | number[], activeThumb: number) => readerService.setRate(value as number) 
    const handleLineBreak = (e : Event, value: number | number[], activeThumb: number) => readerService.setLineBreak(value as number) 

    return (
        <Stack spacing={2} direction="column" justifyContent={"center"}>
            <Button variant="contained" onClick={handleClick}>
                <PlayArrowRoundedIcon />
            </Button>
            <Stack flex={1}>
                <Typography>Rate: {readerService.rate}</Typography>   
                <Slider onChange={handleRateChange} step={.1} marks min={.5} max={2} defaultValue={readerService.defaultRate} valueLabelDisplay="auto" />
                <Typography>Break between lines in seconds: {readerService.lineBreak}</Typography>   
                <Slider onChange={handleLineBreak} step={.5} marks min={1} max={5} defaultValue={readerService.defaultLineBreak} valueLabelDisplay="auto" />
            </Stack>
        </Stack>
    )
}

export default ReaderControls