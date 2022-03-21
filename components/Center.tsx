import { ChevronDownIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const colors: string[] = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500',
]

function Center() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify()
    const [color, setColor] = useState<any>('');
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState<any>(playlistState)

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId])
    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        }).catch((error) => {
            console.error('Something went wrong!', error);
        })
    }, [spotifyApi, playlistId])

    return (
        <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
            <div className='absolute top-5 right-8'>
                <div
                    onClick={() => signOut()}
                    className='flex items-center bg-black text-white space-x-3 opacity-90 
                    hover:opacity-80 cursor-pointer 
                    rounded-full p-1 pr-2'>
                    <img
                        className='w-190 h-10 rounded-full'
                        src={session?.user?.image?.toString()}
                    />
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </div>
            <section className={`flex items-end space-x-7 
                bg-gradient-to-b to-black ${color} h-80 
                text-white p-8 w-full`}>
                <img
                    className='h-44 w-44 shadow-2xl'
                    src={playlist?.images?.[0]?.url}
                />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl'>{playlist?.name}</h1>
                </div>
            </section>
            <div>
                <Songs />
            </div>
        </div>
    )
}

export default Center