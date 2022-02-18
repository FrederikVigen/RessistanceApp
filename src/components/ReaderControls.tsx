import { Button, Stack } from '@mui/material'
import React from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const ReaderControls = () => {
    return (
        <Stack spacing={2} direction="row" justifyContent={"center"}>
            <Button variant="contained">
                <PlayArrowRoundedIcon />
            </Button>
        </Stack>
    )
}

export default ReaderControls