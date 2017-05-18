import React, { Component } from 'react';
import YouTube from 'react-youtube';
import _ from 'lodash';

import videoAPI from './utils/videoAPI';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [
                // 'Z6FPJOgfCkc', // Galaxy Supernova
                // 'QN6KVm5cRWw', // Shy Boy
                // 'DRSRpXPZVdM', // Is It Poppin
                // 'NPqtL1dtrlA', // Love Options
                // 'Zy_sgB4EJB8', // Tell Me Tell Me
                // 'BclmGVKdHII', // Gee
                // 'nUDMw9f24kE', // UU
                // '6SwiSpudKWI', // Genie
                // 'TGbwL8kSpEk', // Oh!
                // 'kKS12iGFyEA', // Danger
                // 'nQm_9nbY_7U', // Would You Like Some Tea?
                // 'Qk52ypnGs68', // Number 9
                // 'Y-FhDScM_2w', // Some
                // '8iY3wGoJfng', // Sunshine
                // 'Fzr2Nv8NTEE', // Mr. Taxi
                // 'Z8j_XEn9b_8', // Mr. Mr.
                // 'K5H-GvnNz2Y', // Mr. Chu
                // 'F7SFr9dJrw4', // Hush
                'ouR4nn1G9r4', // Not Spring, Love
                'p6XLNsJ9YrA', // Give it to me
                'PfPWxK1BQFI', // Hoot
                // 'YQl5SLEYGLA', // NoNoNo
                'c3-pUNhYORw', // Paparazzi
                'jG1cIlM1juw', // Flower Power
                // '93GuC1dMkxc', // Beep Beep
            ],
            selectedVideo: ''
        };
    }

    componentDidMount() {
        this.randomVideo();

        videoAPI.getVideos()
        .then((videos) => {
            console.log(videos.items);

            let cool = _.forEach(videos, function(video) {

                console.log(video)

                let me = _.get(video, video.snippet.resourceId.videoId);

            });

        });
    }

    randomVideo = () => {
        this.setState(function() {
            return {
                selectedVideo: this.state.videos[Math.floor(Math.random()*this.state.videos.length)]
            }
        });
    }

    _onError = (event) => {
        console.log(event.target.getVideoData());
        this.setState(function() {
            return {
                selectedVideo: this.state.videos[Math.floor(Math.random()*this.state.videos.length)]
            }
        });
    }

    render() {

        const opts = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 0,
                rel: 0,
                showinfo: 0
            }
        };

        return (
            <div>
                <button className="btn" onClick={this.randomVideo}>New Video</button>
                <div className="video-wrapper">
                    <YouTube
                        videoId="Nv5_uvyqI9s"
                        opts={opts}
                        className="video-iframe"
                        onEnd={this.randomVideo}
                        onError={this._onError}
                    />
                </div>
            </div>
        );
    }
}

export default App;
