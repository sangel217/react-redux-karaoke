import * as types from "./../constants/ActionTypes";
import v4 from 'uuid/v4';

export const nextLyric = (currentSongId) => ({
  type: types.NEXT_LYRIC,
  currentSongId
});

export const restartSong = (currentSongId) => ({
    type: types.RESTART_SONG,
    currentSongId
});

export const changeSong = (newSelectedSongId) => ({
    type: types.CHANGE_SONG,
    newSelectedSongId
});

export function fetchSongId(title) {
    return function (dispatch) {
        const localSongId = v4();
        dispatch(requestSong(title, localSongId));
        title = title.replace(' ', '_');
        return fetch('http://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&page_size=1&s_track_rating=desc&apikey=c50fc3dcb257e15c36bf101e6aa9221e').then(
            response => response.json(),
            error => console.log('An error ocurred.', error)
        ).then(function(json) {
            console.log('CHECK OUT THID SWEET API RESPONSE: ', json)
        });
    };
}

export const requestSong = (title, localSongId) => ({
    type: types.REQUEST_SONG,
    title,
    songId: localSongId
});