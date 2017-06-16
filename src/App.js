import React, { Component } from 'react';
import YouTube from 'react-youtube';

import videoAPI from './utils/videoAPI';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            customVideos: [
                'Z6FPJOgfCkc', // Galaxy Supernova
                'QN6KVm5cRWw', // Shy Boy
                'DRSRpXPZVdM', // Is It Poppin
                'NPqtL1dtrlA', // Love Options
                'Zy_sgB4EJB8', // Tell Me Tell Me
                'BclmGVKdHII', // Gee
                'nUDMw9f24kE', // UU
                '6SwiSpudKWI', // Genie
                'TGbwL8kSpEk', // Oh!
                'kKS12iGFyEA', // Danger
                'nQm_9nbY_7U', // Would You Like Some Tea?
                'Qk52ypnGs68', // Number 9
                'Y-FhDScM_2w', // Some
                '8iY3wGoJfng', // Sunshine
                'Fzr2Nv8NTEE', // Mr. Taxi
                'Z8j_XEn9b_8', // Mr. Mr.
                'K5H-GvnNz2Y', // Mr. Chu
                'YXZ19CvCmto', // Hush
                'ouR4nn1G9r4', // Not Spring, Love
                'p6XLNsJ9YrA', // Give it to me
                'PfPWxK1BQFI', // Hoot
                'hspqQuuuGIw', // NoNoNo
                'c3-pUNhYORw', // Paparazzi
                'jG1cIlM1juw', // Flower Power
                'JCscyDno4yA', // Beep Beep
                'bAicySTsvLo' // Berry Good Don't believe
            ],
            selectedVideo: '',
            playlists: {
                kpop: 'PLgAWynvKDEDVaILn5viLCElGP0u0svWiS',
                tswift: 'PLMEZyDHJojxNYSVgRCPt589DI5H7WT1ZK'
            },
            controlsOpen: false
        };
    }

    componentDidMount() {

        // videoAPI.getVideos('PLgAWynvKDEDVaILn5viLCElGP0u0svWiS')
        videoAPI.getVideos(this.state.playlists.kpop)
        .then((videos) => {
            this.setState(function() {
                return {
                    videos: videos
                }
            });
            this.randomVideo();
        });

    }

    randomVideo = () => {
        this.setState(function() {
            return {
                selectedVideo: this.state.videos[Math.floor(Math.random()*this.state.videos.length)]
            }
        });
    }

    switchPlaylist = (playlist) => {

        if (playlist === 'custom') {
            this.setState(function() {
                return {
                    videos: this.state.customVideos,
                    selectedVideo: this.state.customVideos[Math.floor(Math.random()*this.state.videos.length)]
                }
            });
        } else {
            videoAPI.getVideos(this.state.playlists[playlist])
            .then((videos) => {
                this.setState(function() {
                    return {
                        videos: videos
                    }
                });
                this.randomVideo();
            });
        }

    }

    toggleControls = () => {
        this.setState(function(prev) {
            return {
                controlsOpen: !this.state.controlsOpen
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
            <div className={this.state.controlsOpen ? 'show-controls' : ''}>
                <div className="controls-wrap">
                    <button className="close-btn" onClick={this.toggleControls}>Close</button>
                    <p><button className="btn btn--block" onClick={this.switchPlaylist.bind(null, 'kpop')}>Kpop</button></p>
                    <p><button className="btn btn--block" onClick={this.switchPlaylist.bind(null, 'tswift')}>Tswift</button></p>
                    <p className="u-bottom0"><button className="btn btn--block" onClick={this.switchPlaylist.bind(null, 'custom')}>Custom</button></p>
                </div>
                <div className="controls-btn">
                    <button className="btn" onClick={this.toggleControls}>Playlists</button>
                </div>
                <div className="controls-btn controls-btn--right">
                    <button className="btn" onClick={this.randomVideo}>Random Video</button>
                </div>
                <div className="video-wrapper">
                    <YouTube
                        videoId={this.state.selectedVideo}
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
