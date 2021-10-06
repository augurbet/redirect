import * as React from "react";
import './App.css';

function App() {
  const [counter, setCounter] = React.useState(10);
  const [stop, setStop] = React.useState(false);
  const serialize = function(obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (!('r' in params)) params['r'] = "0xC8846356F659c954996B5Da15353C5b36733b748";
  function redirect() {
    fetch('https://api.github.com/repos/AugurProject/turbo/releases/latest').then(T => T.json()).then(json => {
      var url = "https://"+json["body"].match("(?<=CIDv1: )(.*)(?=)")[0]+".ipfs.dweb.link"+window.location.pathname;
      if (Object.keys(params).length > 0) url = url+"?"+serialize(params);
      url = url+window.location.hash;
      window.location = url;
    });
  }
  function handleRedirect(e) {
    e.preventDefault();
    redirect();
  }
  function handleStop(e) {
    e.preventDefault();
    setStop(true);
  }
  function redirectStop() {
    redirect();
  }
  let t = setTimeout(redirectStop, counter*1000);
  React.useEffect((t) => {
    stop && clearTimeout(t);
  }, [counter]);
  React.useEffect(() => {
    !stop && counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  const style = {
    "pointerEvents": 'none',
  }
  return (
    <div className="App">
      <section id="i5un" class="gpd-section">
        <div id="ialh" class="gpd-container">
          <div id="ipls"class="gdp-row">
            <div id="i5hl" class="cell">
              <img id="in4dg" src="https://cdn.grapedrop.com/ue227d0fa634a4f36afc60c0280fbc988/e9a1d5140e22453c866b415f8af01195_white.png"/>
            </div>
          </div>
        </div>
      </section>
      <section id="iz0i" class="gpd-section">
        <div id="ia1v" class="gpd-container">
          <h2 id="iwpky" class="gpd-header">REDIRECT NOTICE</h2>
          <div id="imffb" class="gpd-text">
            <div id="i6ysh" class="countdown-row">
              <div id="ito3h" class="block cell">
                <span id="iwpky" class="countdown-counter">{counter}</span>
                <div>seconds</div>
              </div>
              <div id="ii8ji" class="block cell">
                 <a style={ stop ? style : {} } href="#" onClick={handleStop} id="i80bo" class="gpd-link social-link stop-countdown">Stop</a>
              </div>
            </div>
            <div class="text-par">
              You are being redirected to a public and community deployed and maintained instance of the decentralized and open source Augur client, hosted and served on the distributed, peer-to-peer file network&nbsp;Interplanetary File System&nbsp;(IPFS) with no affiliations to this domain.
            </div>
          </div>
          <div id="i6ysh" class="gdp-row">
            <div id="ito3h" class="cell">
            </div>
            <div id="ipt14" class="cell">
              <a href="#" onClick={handleRedirect} id="i80bo" class="gpd-link social-link">Redirect now</a>
            </div>
            <div id="ii8ji" class="cell">
            </div>
          </div>
        </div>
      </section>
      <section id="irzqg" class="gpd-section">
        <div id="iactu" class="gpd-container">
          <h2 id="iz682" class="gpd-header">DISCLAIMER</h2>
          <div id="izvan" class="gpd-text">
            <div class="text-par">
              You are now leaving the augur.bet domain and entering a website with no affiliation, support, or relationship to this domain name.
            </div>
            <div class="text-par">
              It is assumed you are accessing this redirect from outside Belarus, Cuba, Iran, Iraq, Côte d'Ivoire, Liberia, North Korea, Sudan, Syria, the United Kingdom, the United States or Zimbabwe.&nbsp;By doing so, you acknowledge that:
            this domain name and its administrators do not endorse this website, its sponsor, or any policies, activities, products, or services offered on the site by any advertiser or service provider on this site. Our administrators cannot attest to the accuracy of the information provided by this link. Services offered when following the link have no affiliation to our domain name and its administrators, and no claims are made in relation to the following link.​​​​​​​
            </div>
            <div class="text-par">
              By using this service, you attest you are not a citizen or resident of the Belarus, Cuba, Iran, Iraq, Côte d'Ivoire, Liberia, North Korea, Sudan, Syria, United Kingdom, United States or Zimbabwe and aren't currently accessing and will not in the future utilize this redirect while located within these jurisdictions, including by using VPNs or other techniques to mask your physical location.
            </div>
          </div>
          <div id="i9w9v" class="gpd-text">This service is not affiliated with PM Research or the Forecast Foundation.
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
