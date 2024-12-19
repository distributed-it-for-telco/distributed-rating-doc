// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="about.html">About</a></li><li class="chapter-item expanded affix "><li class="part-title">Concepts</li><li class="chapter-item expanded "><a href="CONCEPTS/concepts.html"><strong aria-hidden="true">1.</strong> Concepts</a></li><li class="chapter-item expanded affix "><li class="part-title">Architecture</li><li class="chapter-item expanded "><a href="ARCHITECTURE/architecture.html"><strong aria-hidden="true">2.</strong> Software Architecture</a></li><li class="chapter-item expanded "><a href="ARCHITECTURE/functional-specification.html"><strong aria-hidden="true">3.</strong> Functional Specification</a></li><li class="chapter-item expanded affix "><li class="part-title">Use Cases</li><li class="chapter-item expanded "><a href="USE-CASES/UC-01/index.html"><strong aria-hidden="true">4.</strong> UC-01: Customer product inventory</a></li><li class="chapter-item expanded "><a href="USE-CASES/UC-02/index.html"><strong aria-hidden="true">5.</strong> UC-02: Rate usage - Overview</a></li><li class="chapter-item expanded "><a href="USE-CASES/UC-03/index.html"><strong aria-hidden="true">6.</strong> UC-03: Rate usage - Regular</a></li><li class="chapter-item expanded "><a href="USE-CASES/UC-04/index.html"><strong aria-hidden="true">7.</strong> UC-04: Rate usage - Threshold</a></li><li class="chapter-item expanded "><a href="USE-CASES/UC-05/index.html"><strong aria-hidden="true">8.</strong> UC-05: Rate usage - Bundle</a></li><li class="chapter-item expanded "><a href="USE-CASES/UC-06/index.html"><strong aria-hidden="true">9.</strong> UC-06: CQRS - Usage Proof</a></li><li class="chapter-item expanded "><a href="USE-CASES/UC-07/index.html"><strong aria-hidden="true">10.</strong> UC-07: Rate usage - MetaVerse</a></li><li class="chapter-item expanded affix "><li class="part-title">Architecture decision records</li><li class="chapter-item expanded "><a href="ADR/ard001-monorepo_code_organization.html"><strong aria-hidden="true">11.</strong> Monorepo code organization</a></li><li class="chapter-item expanded affix "><li class="part-title">Studies</li><li class="chapter-item expanded "><a href="STUDIES/migration-towards-wasmv1.html"><strong aria-hidden="true">12.</strong> Wasm v1 migration</a></li><li class="chapter-item expanded affix "><li class="part-title">How-to</li><li class="chapter-item expanded "><a href="HOW-TO/kickstart.html"><strong aria-hidden="true">13.</strong> WasmCloud Kickstart</a></li><li class="chapter-item expanded "><a href="HOW-TO/smithy-notes.html"><strong aria-hidden="true">14.</strong> Smithy</a></li><li class="chapter-item expanded affix "><li class="part-title">Handbook</li><li class="chapter-item expanded "><a href="HANDBOOK/kv-store-management.html"><strong aria-hidden="true">15.</strong> Key-Value store management</a></li><li class="chapter-item expanded "><a href="HANDBOOK/link-management.html"><strong aria-hidden="true">16.</strong> Link management</a></li><li class="chapter-item expanded "><a href="HANDBOOK/shutdown-host.html"><strong aria-hidden="true">17.</strong> Shutdown host</a></li><li class="chapter-item expanded affix "><li class="part-title">Archives</li><li class="chapter-item expanded "><a href="ARCHIVE/rationale.html"><strong aria-hidden="true">18.</strong> Rationale</a></li><li class="chapter-item expanded "><a href="ARCHIVE/requirements.html"><strong aria-hidden="true">19.</strong> Requirements</a></li><li class="chapter-item expanded "><a href="ARCHIVE/model.html"><strong aria-hidden="true">20.</strong> Model</a></li><li class="chapter-item expanded "><a href="ARCHIVE/model-solution1.html"><strong aria-hidden="true">21.</strong> Solution 1</a></li><li class="chapter-item expanded "><a href="ARCHIVE/about-wasmcloud.html"><strong aria-hidden="true">22.</strong> About wasmCloud</a></li><li class="chapter-item expanded "><a href="ARCHIVE/architecture.html"><strong aria-hidden="true">23.</strong> wasmCloud Architecture</a></li><li class="chapter-item expanded "><a href="ARCHIVE/prototype-architecture.html"><strong aria-hidden="true">24.</strong> Prototype Architecture</a></li><li class="chapter-item expanded "><a href="ARCHIVE/technical-requirements.html"><strong aria-hidden="true">25.</strong> Technical requirements</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
