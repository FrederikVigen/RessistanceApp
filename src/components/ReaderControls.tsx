import { Button, Slider, Stack, Typography } from '@mui/material'
import React from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { useReaderService } from '../Services/ReaderService';
import { useTextService } from '../Services/TextService';

const ReaderControls = () => {
    const readerService = useReaderService()
    const textService = useTextService()

    const handlePlayButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => 
        (readerService.isPaused ? readerService.resumeSpeech() : readerService.readText(textService.currentText))
    const handlePauseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => readerService.pauseSpeech()
    const handleStopButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => readerService.stopSpeech()
    const handleRateChange = (e : Event, value: number | number[], activeThumb: number) => readerService.setRate(value as number) 
    const handleLineBreak = (e : Event, value: number | number[], activeThumb: number) => readerService.setLineBreak(value as number) 

    return (
        <Stack spacing={2} direction="column" justifyContent={"center"}>
            <Stack direction="row" spacing={2}>
            <Button sx={{flex:1}} variant="contained" onClick={readerService.isSpeaking ? handlePauseButtonClick : handlePlayButtonClick}>
                {readerService.isSpeaking ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
            </Button>     
            <Button sx={{flex:1}} variant="contained" onClick={handleStopButtonClick}>
                <StopRoundedIcon/>
            </Button>
            </Stack>
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