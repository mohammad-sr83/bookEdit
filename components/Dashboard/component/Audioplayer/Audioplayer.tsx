import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useTheme } from '@mui/material/styles';
interface AudioProps {
  audio: string;
}

const AudioPlayerForm: React.FC<AudioProps> = ({ audio }) => {
  
  const theme = useTheme();

  return (
    <div className='flex justify-center items-center'>
      <AudioPlayer
        style={{ backgroundColor: theme.palette.mode === 'dark' ? '#262932' : '#fff'}}
        src={`${audio}`}
        showJumpControls={false} 
        customProgressBarSection={[]}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        layout="horizontal-reverse" 
      />
    </div>
  )
}
export default AudioPlayerForm