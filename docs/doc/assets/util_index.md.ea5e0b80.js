import{_ as n,c as s,o as a,b as p}from"./app.fc9f34b8.js";const m='{"title":"\u5DE5\u5177\u51FD\u6570","description":"","frontmatter":{},"headers":[{"level":2,"title":"getAddressByPoints \u901A\u8FC7\u5750\u6807\u83B7\u53D6\u5730\u5740","slug":"getaddressbypoints-\u901A\u8FC7\u5750\u6807\u83B7\u53D6\u5730\u5740"},{"level":2,"title":"getPointByAddress \u901A\u8FC7\u5730\u5740\u83B7\u53D6\u5750\u6807","slug":"getpointbyaddress-\u901A\u8FC7\u5730\u5740\u83B7\u53D6\u5750\u6807"},{"level":2,"title":"getPointsTransfer \u5750\u6807\u8F6C\u6362","slug":"getpointstransfer-\u5750\u6807\u8F6C\u6362"},{"level":2,"title":"getConfig \u83B7\u53D6\u7EC4\u4EF6\u914D\u7F6E","slug":"getconfig-\u83B7\u53D6\u7EC4\u4EF6\u914D\u7F6E"}],"relativePath":"util/index.md"}',t={},e=p(`<h1 id="\u5DE5\u5177\u51FD\u6570" tabindex="-1">\u5DE5\u5177\u51FD\u6570 <a class="header-anchor" href="#\u5DE5\u5177\u51FD\u6570" aria-hidden="true">#</a></h1><h2 id="getaddressbypoints-\u901A\u8FC7\u5750\u6807\u83B7\u53D6\u5730\u5740" tabindex="-1">getAddressByPoints \u901A\u8FC7\u5750\u6807\u83B7\u53D6\u5730\u5740 <a class="header-anchor" href="#getaddressbypoints-\u901A\u8FC7\u5750\u6807\u83B7\u53D6\u5730\u5740" aria-hidden="true">#</a></h2><p>\u793A\u4F8B</p><div class="language-bash line-numbers-mode"><pre><code><span class="token function">import</span> <span class="token punctuation">{</span> getPointByAddress <span class="token punctuation">}</span> from <span class="token string">&#39;vue-baidu-map-3x&#39;</span><span class="token punctuation">;</span>

/**
 * \u901A\u8FC7\u5750\u6807\u83B7\u53D6\u5730\u5740 config\u548C\u8FD4\u56DE\u503C\u53C2\u8003\u767E\u5EA6api
 * @param config <span class="token punctuation">{</span>IPointToAddressConfig<span class="token punctuation">}</span>  \u9ED8\u8BA4\u503C <span class="token punctuation">{</span>extensions_poi <span class="token number">1</span>,output: <span class="token string">&#39;json&#39;</span>,coordtype: <span class="token string">&#39;wgs84ll&#39;</span>,timeout: <span class="token number">60</span>  <span class="token punctuation">}</span>
 * @param aks <span class="token punctuation">{</span>String<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span> <span class="token punctuation">;</span> ak\u4E0D\u4F20\u9ED8\u8BA4\u4F7F\u7528map ak
 * 
 * @return <span class="token punctuation">{</span>promise<span class="token punctuation">}</span> <span class="token punctuation">;</span> 
*/

const config <span class="token operator">=</span> <span class="token punctuation">{</span>
    location:<span class="token punctuation">[</span><span class="token string">&#39;31.225696563611&#39;</span>, <span class="token string">&#39;121.49884033194&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
getAddressByPoints<span class="token punctuation">(</span>config, <span class="token punctuation">[</span><span class="token string">&#39;\u4F60\u7684ak&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="getpointbyaddress-\u901A\u8FC7\u5730\u5740\u83B7\u53D6\u5750\u6807" tabindex="-1">getPointByAddress \u901A\u8FC7\u5730\u5740\u83B7\u53D6\u5750\u6807 <a class="header-anchor" href="#getpointbyaddress-\u901A\u8FC7\u5730\u5740\u83B7\u53D6\u5750\u6807" aria-hidden="true">#</a></h2><p>\u793A\u4F8B</p><div class="language-bash line-numbers-mode"><pre><code><span class="token function">import</span> <span class="token punctuation">{</span> getAddressByPoints <span class="token punctuation">}</span> from <span class="token string">&#39;vue-baidu-map-3x&#39;</span><span class="token punctuation">;</span>

/**
 * \u901A\u8FC7\u5730\u5740\u83B7\u53D6\u5750\u6807 config\u548C\u8FD4\u56DE\u503C\u53C2\u8003\u767E\u5EA6api
 * @param config <span class="token punctuation">{</span>IAddressToPointConfig<span class="token punctuation">}</span> \u9ED8\u8BA4\u503C <span class="token punctuation">{</span>output: <span class="token string">&#39;json&#39;</span>,timeout: <span class="token number">60</span><span class="token punctuation">}</span>
 * @param aks <span class="token punctuation">{</span>String<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span> <span class="token punctuation">;</span> ak\u4E0D\u4F20\u9ED8\u8BA4\u4F7F\u7528map ak
 * 
 * @return <span class="token punctuation">{</span>promise<span class="token punctuation">}</span> <span class="token punctuation">;</span> 
*/

const config <span class="token operator">=</span> <span class="token punctuation">{</span>
    address:<span class="token string">&#39;\u5317\u4EAC\u5E02\u6D77\u6DC0\u533A\u4E0A\u5730\u5341\u885710\u53F7&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
getAddressByPoints<span class="token punctuation">(</span>config, <span class="token punctuation">[</span><span class="token string">&#39;\u4F60\u7684ak&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="getpointstransfer-\u5750\u6807\u8F6C\u6362" tabindex="-1">getPointsTransfer \u5750\u6807\u8F6C\u6362 <a class="header-anchor" href="#getpointstransfer-\u5750\u6807\u8F6C\u6362" aria-hidden="true">#</a></h2><p>\u793A\u4F8B</p><div class="language-bash line-numbers-mode"><pre><code><span class="token function">import</span> <span class="token punctuation">{</span> getAddressByPoints <span class="token punctuation">}</span> from <span class="token string">&#39;vue-baidu-map-3x&#39;</span><span class="token punctuation">;</span>

/**
 * \u5750\u6807\u8F6C\u6362 config\u548C\u8FD4\u56DE\u503C\u53C2\u8003\u767E\u5EA6api
 * @param config <span class="token punctuation">{</span>IPointTransferConfig<span class="token punctuation">}</span> \u9ED8\u8BA4\u503C <span class="token punctuation">{</span>from: <span class="token number">1</span>,to: <span class="token number">5</span>,timeout: <span class="token number">60</span><span class="token punctuation">}</span>
 * @param aks <span class="token punctuation">{</span>String<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span> <span class="token punctuation">;</span> ak\u4E0D\u4F20\u9ED8\u8BA4\u4F7F\u7528map ak
 * 
 * @return <span class="token punctuation">{</span>promise<span class="token punctuation">}</span> <span class="token punctuation">;</span> 
*/

const config <span class="token operator">=</span> <span class="token punctuation">{</span>
    locations:<span class="token punctuation">[</span>
        <span class="token string">&#39;114.21892734521,29.575429778924&#39;</span>,
        <span class="token string">&#39;114.34892734521,29.245429778924&#39;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
getAddressByPoints<span class="token punctuation">(</span>config, <span class="token punctuation">[</span><span class="token string">&#39;\u4F60\u7684ak&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="getconfig-\u83B7\u53D6\u7EC4\u4EF6\u914D\u7F6E" tabindex="-1">getConfig \u83B7\u53D6\u7EC4\u4EF6\u914D\u7F6E <a class="header-anchor" href="#getconfig-\u83B7\u53D6\u7EC4\u4EF6\u914D\u7F6E" aria-hidden="true">#</a></h2><p>\u793A\u4F8B</p><div class="language-bash line-numbers-mode"><pre><code><span class="token function">import</span> <span class="token punctuation">{</span> getConfig <span class="token punctuation">}</span> from <span class="token string">&#39;vue-baidu-map-3x&#39;</span><span class="token punctuation">;</span>

/**
 * \u83B7\u53D6\u7EC4\u4EF6\u914D\u7F6E \u8FD4\u56DE\u503C\u662Fuse\u7EC4\u4EF6\u7684\u53C2\u6570
 * 
 * @return <span class="token punctuation">{</span>config<span class="token punctuation">}</span> <span class="token punctuation">;</span> 
*/

getConfig<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,13),o=[e];function c(i,u,l,r,b,k){return a(),s("div",null,o)}var g=n(t,[["render",c]]);export{m as __pageData,g as default};
