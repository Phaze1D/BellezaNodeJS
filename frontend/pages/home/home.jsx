import React from 'react'
import Carousel from 'components/Carousel/Carousel'
import Favorites from 'components/Favorites/Favorites'


export default class Home extends React.Component {
  constructor(props){
    super(props)
    facebookScript()
    twitterScript()
  }

  componentDidMount() {
    if(window.FB){
      window.FB.XFBML.parse()
    }

    if(window.twttr.init){
      window.twttr.widgets.load()
    }

    if(window.HM && window.HM.finishedLoadingMorePosts){
      window.HM.render()
    }
  }


  render() {
    return (
      <main>
        <Carousel/>
        <Favorites/>

        <div className="grid">
          <div className="col-4 social-feed">
            <div className="fb-page" data-href="https://www.facebook.com/BellezaOrganicaCertificada/" data-tabs="timeline"
                data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false">

              <blockquote cite="https://www.facebook.com/BellezaOrganicaCertificada/" className="fb-xfbml-parse-ignore">
                <a href="https://www.facebook.com/BellezaOrganicaCertificada/">NEAL&#039;S YARD REMEDIES MEXICO</a>
              </blockquote>

            </div>
          </div>

          <div className="col-4 social-feed">
            <a className="twitter-timeline" href="https://twitter.com/NealsYardMexico">Tweets by NealsYardMexico</a>
          </div>

          <div className="col-4 social-feed">
            <div className="tintup" data-id="nealsyardmexico" data-columns="" data-mobilescroll="true" data-infinitescroll="true" style={{height:"100%", width:"100%"}}>
              <a href="http://www.tintup.com/blog/the-best-instagram-widget" style={{width:"118px", height:"31px", backgroundImage: "url(//d33w9bm0n1egwm.cloudfront.net/assets/logos/poweredbytintsmall.png)", position: "absolute", bottom:"10px", right: "20px", textIndent: "-9999px", zIndex:"9"}}>instagram widget</a>
            </div>
          </div>

        </div>
      </main>
    )
  }
}


const facebookScript = function () {
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.9";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

const twitterScript = function () {
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
    return t;
  }(document, "script", "twitter-wjs"));
}
