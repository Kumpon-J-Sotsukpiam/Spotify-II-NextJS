import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSonginfo from '../hooks/useSonginfo';
import useSpotify from '../hooks/useSpotify'

function Player() {
    const spotifyApi = useSpotify();
    const songInfo = useSonginfo();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    
    return (
        <div>
            {/* left */}
            <div>
                <img
                    className='hidden md:inline-flex h-10  w-10'
                    src={songInfo?.album.images?.[0]?.url} />
            </div>
        </div>
    )
}

export default Player