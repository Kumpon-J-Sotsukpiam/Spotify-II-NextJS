import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song';

function Songs() {
    const playlist: any = useRecoilValue(playlistState);
    return (
        <div className='text-white px-8 flex flex-col space-x-1 pb-28'>
            {playlist?.tracks.items.map((track: any, i: number) => (
                <Song
                    key={track.track.id}
                    track={track}
                    order={i}
                />
            ))}
        </div>
    )
}

export default Songs