import axios from 'axios';

let videoAPI = {
    getVideos : function (game) {
        return axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C+id&playlistId=PLgAWynvKDEDVaILn5viLCElGP0u0svWiS&key=AIzaSyDsgYSECSyLU3Ae2nLP_RzRIjRohHCOj0I&maxResults=50')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.warn('Error in getVideos', error);
        });
    }
}

module.exports = videoAPI;