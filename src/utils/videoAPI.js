import axios from 'axios';

let videoAPI = {
    getVideos : function (playlist) {
        return axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C+id&playlistId='+playlist+'&key=AIzaSyDsgYSECSyLU3Ae2nLP_RzRIjRohHCOj0I&maxResults=50')
        .then(function (response) {

            let videoArray = response.data.items.reduce(function(acc, item) {
                acc.push(item.snippet.resourceId.videoId)
                return acc
            }, []);

            return videoArray;
        })
        .catch(function (error) {
            console.warn('Error in getVideos', error);
        });
    }
}

module.exports = videoAPI;