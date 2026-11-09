document.addEventListener("DOMContentLoaded", () => {
	const questions = document.querySelectorAll(".faq-question");

	questions.forEach((question) => {
		question.addEventListener("click", () => {
			question.classList.toggle("active");
			const answer = question.nextElementSibling;
			const icon = question.querySelector(".icon");

			if (answer.style.display === "block") {
				answer.style.display = "none";
				icon.textContent = "+";
			} else {
				answer.style.display = "block";
				icon.textContent = "-";
			}
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	// Page has finished loading. Now, do things.
	loadLayoutByPetraPixel();

	// Add any custom JavaScript code here...
});

document.addEventListener("wheel", gererEvenementDeDefilement, { passive: false });

function gererEvenementDeDefilement(event) {
	// Vérifie si l'utilisateur est en haut de la page et tente de défiler vers le haut.
	// window.scrollY === 0 : Cela signifie que la page est déjà tout en haut.
	// event.deltaY < 0 : L'utilisateur essaie de défiler vers le haut.

	// Vérifie si l'utilisateur est en bas de la page et tente de défiler vers le bas.
	// window.innerHeight + window.scrollY : La position actuelle en bas de la fenêtre visible.
	// document.body.offsetHeight : La hauteur totale du contenu de la page.
	// Ces deux valeurs égales ou supérieures indiquent qu'on est au bas de la page.
	if ((window.scrollY === 0 && event.deltaY < 0) || (window.innerHeight + window.scrollY >= document.body.offsetHeight && event.deltaY > 0)) {
		// Empêche le comportement de défilement par défaut dans ces cas précis.
		event.preventDefault();
	}
}

function loadLayoutByPetraPixel() {
	const mainEl = document.querySelector("main");
	if (!mainEl) return;
	mainEl.insertAdjacentHTML("beforebegin", headerHTML());
	mainEl.insertAdjacentHTML("afterend", footerHTML());
	giveActiveClassToCurrentPage();
}

const UTILS = new URL("../", document.currentScript.src).href; // le dossier utils/
const SITE = new URL("../../", document.currentScript.src).href; // la racine du site

function headerHTML() {
	// ${nesting} outputs "./" or "../" depending on current page depth.
	// You can use it to refer to images etc.
	// Example: <img src="${nesting}img/logo.png"> might output <img src="../img/logo.png">

	return `
  
      <!-- =============================================== -->
      <!-- HEADER -->
      <!-- =============================================== -->
      <header>
      </header>
        
      <!-- =============================================== -->
      <!-- LEFT SIDEBAR -->
      <!-- =============================================== -->

      <aside class="left-sidebar">
	  
        
        <!-- NAVIGATION -->
        <div class="sidebar-section">
          <div class="sidebar-title">Navigation</div>
          <nav>
            <ul>
              <li>
                <li><a href="https://elisabethm.vercel.app" id="nav-title"><img width="25" src="${UTILS}images/puce/home.gif" alt aria-hidden="true">Home</a></li>
                <li><a href="${SITE}moreAboutMe/more-about-me.html" id="nav-title"><img width="25"src="${UTILS}images/puce/eye.gif" alt aria-hidden="true">More about me</a></li>
              </li>
            </ul>
          </nav>
          </div>
        </div>
        

        <div class="sidebar-section" id="time"> 
          <div class="sidebar-title">My time</div>
          <iframe src="https://free.timeanddate.com/clock/n1216/tlfr2/fn6/fcf9ebe0/tct/pct/ta1" frameborder="0" width="170" height="22" allowtransparency="true" title="Clock"></iframe>
        </div>  
             
        
        <div class="sidebar-section" id="links">
          <div class="sidebar-title">Links</div>
          <div class="site-button">
          	<div><a href="https://github.com/KitsuneNoMegami"><img src="${UTILS}images/buttonrepositoy.gif" alt="buttonrepository"></a></div>
          </div>
        </div>
        
      </aside>`;
}

function footerHTML() {
	// ${nesting} outputs "./" or "../" depending on current page depth.
	// You can use it to refer to images etc.
	// Example: <img src="${nesting}img/logo.png"> might output <img src="../img/logo.png">

	return `


                                            <!-- =============================================== -->
                                            <!-- FOOTER -->
                                            <!-- =============================================== -->

                                            <footer>
                                            </footer>`;
}

/* Do not edit anything below this line unless you know what you're doing. */

function giveActiveClassToCurrentPage() {
	const els = document.querySelectorAll("nav a");
	[...els].forEach((el) => {
		const href = el.getAttribute("href").replace(".html", "").replace("#", "");
		const pathname = window.location.pathname.replace("/public/", "");
		const currentHref = window.location.href.replace(".html", "") + "END";

		/* Homepage */
		if (href == "/" || href == "/index.html") {
			if (pathname == "/") {
				el.classList.add("active");
			}
		} else {
			/* Other pages */
			if (currentHref.includes(href + "END")) {
				el.classList.add("active");

				/* Subnavigation: */

				if (el.closest("details")) {
					el.closest("details").setAttribute("open", "open");
					el.closest("details").classList.add("active");
				}

				if (el.closest("ul")) {
					if (el.closest("ul").closest("ul")) {
						el.closest("ul").closest("ul").classList.add("active");
					}
				}
			}
		}
	});
}

function getNesting() {
	const numberOfSlashes = window.location.pathname.split("/").length - 1;
	if (numberOfSlashes == 1) return "./";
	return "../".repeat(numberOfSlashes - 1);
}
