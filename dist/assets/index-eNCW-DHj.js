(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}})();function f(){const e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",o=e||t;document.documentElement.setAttribute("data-theme",o),document.getElementById("theme-toggle")?.addEventListener("click",()=>{const a=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",a),localStorage.setItem("theme",a)})}function g(){const e=document.querySelector(".menu-toggle"),t=document.querySelector(".nav-links");if(!e||!t)return;const o=e.querySelector("i");function s(){t.classList.remove("active"),e.classList.remove("active"),o?.classList.add("fa-bars"),o?.classList.remove("fa-xmark")}e.addEventListener("click",()=>{t.classList.toggle("active"),e.classList.toggle("active"),o?.classList.toggle("fa-bars"),o?.classList.toggle("fa-xmark")}),t.querySelectorAll("a").forEach(a=>{a.addEventListener("click",s)}),document.addEventListener("click",a=>{!t.contains(a.target)&&!e.contains(a.target)&&s()})}const S=["angularjs.png","javascript.png","jquery.png","json.png","nextjs.png","node.png","npm.png","react.png","redux.png","typescript.png","vuejs.png"];function L(){const e=document.querySelector(".hero"),t=document.querySelector(".floating-icons"),o=document.querySelector(".hero-image"),s=document.querySelector(".hero-content");if(!e||!t||!o||!s)return;function a(){requestAnimationFrame(()=>{requestAnimationFrame(()=>{o.classList.add("is-visible"),s.classList.add("is-visible")})})}document.readyState==="loading"?window.addEventListener("load",a,{once:!0}):a();const n=S.map(d=>{const l=document.createElement("img");return l.src=`/assets/IconsFrameWorkes/${d}`,l.alt=d.split(".")[0],l.classList.add("tech-icon"),t.appendChild(l),{element:l,x:Math.random()*e.clientWidth,y:Math.random()*e.clientHeight,dx:(Math.random()-.5)*1.5,dy:(Math.random()-.5)*1.5}});function r(){const d=e.clientWidth,l=e.clientHeight;n.forEach(i=>{const u=i.element.offsetWidth;i.x+=i.dx,i.y+=i.dy,(i.x<=0||i.x>=d-u)&&(i.dx*=-1),(i.y<=0||i.y>=l-u)&&(i.dy*=-1),i.element.style.transform=`translate(${i.x}px, ${i.y}px)`}),requestAnimationFrame(r)}r()}class b{constructor({id:t,title:o,slug:s,category:a,description:n,technologies:r,features:d,status:l,url:i,image:u}){this.id=t,this.title=o,this.slug=s,this.category=a,this.description=n,this.technologies=r,this.features=d,this.status=l,this.url=i,this.image=u}getShortDescription(){return this.description.length>130?`${this.description.slice(0,130)}...`:this.description}}async function k(){const e=await fetch("/data/projects.json");if(!e.ok)throw new Error("Failed to load projects");return(await e.json()).map(o=>new b(o))}function P(e){return`
    <article class="project-card">
      <div class="card-image">
        <img src="${e.image}" alt="${e.title}" />
      </div>
      <div class="card-content">
        <div>
          <p class="project-category">${e.category}</p>
          <h3>${e.title}</h3>
        </div>
        <p>${e.getShortDescription()}</p>
        <ul class="technology-list">
          ${e.technologies.map(t=>`<li>${t}</li>`).join("")}
        </ul>
        <a href="#project/${e.slug}">
          View Details
        </a>
      </div>
    </article>
  `}async function $(){const e=document.querySelector(".project-grid");if(e)try{const t=await k();e.innerHTML=t.map(P).join("")}catch(t){e.innerHTML='<p class="error-message">Projects could not be loaded.</p>',console.error(t)}}const M=[{name:"GitHub",url:"https://github.com/Shabanaly",icon:"fab fa-github"},{name:"LinkedIn",url:"https://www.linkedin.com/in/shaban-ali-03982a329/",icon:"fab fa-linkedin"},{name:"Facbook",url:"https://www.facebook.com/shabanaly2024/",icon:"fab fa-facebook"},{name:"Whatsapp",url:"https://wa.me/201019979315?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%B4%D8%B9%D8%A8%D8%A7%D9%86%D8%8C%20%D9%84%D9%82%D8%AF%20%D9%88%D8%AC%D8%AF%D8%AA%20%D9%85%D9%84%D9%81%20%D8%A3%D8%B9%D9%85%D8%A7%D9%84%D9%83%20%D9%88%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83!",icon:"fab fa-whatsapp"},{name:"Email",url:"mailto:sa676185@gmail.com",icon:"fas fa-envelope"},{name:"Phone",url:"tel:+201019979315",icon:"fas fa-phone"}];function x(){M.forEach(e=>{const t=document.createElement("a"),o=document.querySelector(".contact-list");t.href=e.url,t.target="_blank",t.rel="noopener noreferrer",t.setAttribute("aria-label",e.name),t.innerHTML=`<i class="${e.icon}"></i>`,o.appendChild(t)})}const F="Shaban Aly Portfolio",T="Shaban Aly | Frontend Developer Portfolio",q="Frontend developer portfolio for Shaban Aly, showcasing responsive web projects, practical interfaces, and modern JavaScript experiences.",H="/assets/portfolio.png";function h(e="/"){return new URL(e,window.location.origin).href}function y(e,t,o){const s=document.head.querySelector(e);s&&s.setAttribute(t,o)}function c(e,t){y(e,"content",t)}function v({title:e=T,description:t=q,image:o=H,url:s=window.location.pathname+window.location.hash,type:a="website"}={}){const n=h(s),r=h(o);document.title=e,c('meta[name="description"]',t),c('meta[name="author"]',"Shaban Aly"),c('meta[property="og:title"]',e),c('meta[property="og:description"]',t),c('meta[property="og:image"]',r),c('meta[property="og:url"]',n),c('meta[property="og:type"]',a),c('meta[property="og:site_name"]',F),c('meta[name="twitter:title"]',e),c('meta[name="twitter:description"]',t),c('meta[name="twitter:image"]',r),y('link[rel="canonical"]',"href",n)}function E(){v()}function I(e){v({title:`${e.title} | Project Details | Shaban Aly`,description:e.description,image:e.image,url:`/#project/${e.slug}`,type:"article"})}async function C(){const e=await fetch("/data/projects.json");if(!e.ok)throw new Error("Failed to load projects");return(await e.json()).map(o=>new b(o))}function m(e=[]){return e.map(t=>`<li>${t}</li>`).join("")}function w(){return`
  <header class="site-header">
    <a class="brand" href="#home">Shaban Aly</a>

    <nav class="site-nav" aria-label="Main navigation">
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>

    <div class="nav-actions">
      <button
        class="icon-button theme-toggle"
        id="theme-toggle"
        type="button"
        aria-label="Toggle theme"
      >
        <span class="theme-icons" aria-hidden="true">
          <i class="fas fa-sun sun"></i>
          <i class="fas fa-moon moon"></i>
        </span>
      </button>
      <button
        class="icon-button menu-toggle"
        type="button"
        aria-label="Toggle menu"
      >
        <i class="fas fa-bars" aria-hidden="true"></i>
      </button>
    </div>
  </header>
  `}function j(){return`
  <footer>
    <p>&copy; ${new Date().getFullYear()} Shaban Aly. All rights reserved.</p>
  </footer>
  `}function p(){return`
    ${w()}
    <main>
      <section class="project-details section">
        <a class="back-link" href="#projects">Back to Projects</a>
        <div class="text-panel">
          <p class="error-message">Project details could not be found.</p>
        </div>
      </section>
    </main>
    ${j()}
  `}function B(){window.scrollTo(0,0,{behavior:"smooth"})}function W(e){return B(),`
    ${w()}
    <main>
      <section class="project-details section">
        <a class="back-link" href="#projects">Back to Projects</a>

        <div class="project-details-layout">
          <div class="project-details-image">
            <img src="${e.image}" alt="${e.title}" />
          </div>

          <div class="project-details-content">
            <p class="project-category">${e.category}</p>
            <h1>${e.title}</h1>
            <p>${e.description}</p>

            <div class="project-meta">
              <span>Status: ${e.status}</span>
            </div>

            <section class="project-details-block" aria-labelledby="project-tech-title">
              <h2 id="project-tech-title">Technologies</h2>
              <ul class="technology-list">
                ${m(e.technologies)}
              </ul>
            </section>

            <section class="project-details-block" aria-labelledby="project-features-title">
              <h2 id="project-features-title">Features</h2>
              <ul class="feature-list">
                ${m(e.features)}
              </ul>
            </section>

            <a class="primary-link" href="${e.url}" target="_blank" rel="noreferrer">
              Visit Project
            </a>
          </div>
        </div>
      </section>
    </main>
    ${j()}
  `}async function O(e,t=window.location.hash){if(!e||!t.startsWith("#project/"))return!1;const o=t.replace("#project/","");try{const a=(await C()).find(n=>n.slug===o);a&&I(a),e.innerHTML=a?W(a):p()}catch(s){e.innerHTML=p(),console.error(s)}return!0}const D=document.querySelector("#app");function N(){E(),D.innerHTML=`
  <header class="site-header">
    <a class="brand" href="#home">Shaban Aly</a>

    <nav class="site-nav" aria-label="Main navigation">
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>

    <div class="nav-actions">
      <button
        class="icon-button theme-toggle"
        id="theme-toggle"
        type="button"
        aria-label="Toggle theme"
      >
        <span class="theme-icons" aria-hidden="true">
          <i class="fas fa-sun sun"></i>
          <i class="fas fa-moon moon"></i>
        </span>
      </button>
      <button
        class="icon-button menu-toggle"
        type="button"
        aria-label="Toggle menu"
      >
        <i class="fas fa-bars" aria-hidden="true"></i>
      </button>
    </div>
  </header>

  <main>
    <section class="hero section" id="home">
      <div class="floating-icons" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-content">
          <p class="eyebrow">Frontend Developer</p>
          <h1>Welcome to My Portfolio</h1>
          <p>
            Hi, I'm <span>Shaban Aly</span>, a web developer focused on building
            responsive, clean, and practical web experiences.
          </p>
          <a class="primary-link" href="#projects">View Projects</a>
        </div>

        <div class="hero-image">
          <img src="/assets/images/me/me.png" alt="Shaban Aly" />
        </div>
      </div>
    </section>

    <section class="projects section" id="projects">
      <div class="section-header">
        <p class="eyebrow">Selected Work</p>
        <h2>Projects</h2>
      </div>
      <div class="project-grid" aria-live="polite"></div>
    </section>

    <section class="about section" id="about">
      <div class="section-header">
        <p class="eyebrow">About</p>
        <h2>About Me</h2>
      </div>
      <div class="text-panel">
        <p>
          I am a motivated software developer with a strong passion for creating
          user-friendly web applications. I enjoy working with modern frontend
          tools, improving interfaces, and turning ideas into practical products
          that feel simple to use.
        </p>
      </div>
    </section>

    <section class="contact section" id="contact">
      <div class="section-header">
        <p class="eyebrow">Contact</p>
        <h2>Get In Touch</h2>
      </div>
      <div class="contact-list"></div>
    </section>
  </main>

  <footer>
    <p>&copy; ${new Date().getFullYear()} Shaban Aly. All rights reserved.</p>
  </footer>
`,f(),g(),L(),$(),x()}async function A(){if(await O(D)){f(),g();return}N(),window.location.hash&&requestAnimationFrame(()=>{document.querySelector(window.location.hash)?.scrollIntoView()})}window.addEventListener("hashchange",A);A();
