/*  hospitalNetworkEmbed.js
    ------------------------------------------------------------
    ▸ Fetches hospital-network-tabs.html from the same folder
      (or edit the src line if you store it elsewhere).
    ▸ Injects the markup into <div id="hospital-network-container">.
    ▸ Re-wires all tab buttons so they keep working after injection.
*/

(function () {
  /*** 1. Config ***/
  const containerId = 'hospital-network-container';

  /* If the HTML file sits next to this JS on jsDelivr (recommended) */
  const htmlSrc = new URL('hospitals.html', document.currentScript.src).href;

  /*** 2. Find (or create) the container ***/
  let host = document.getElementById(containerId);
  if (!host) {
    host = document.createElement('div');
    host.id = containerId;
    document.currentScript.before(host);
  }

  /*** 3. Fetch + inject ***/
  fetch(htmlSrc)
    .then(r => r.text())
    .then(html => {
      host.innerHTML = html;

      /* 4. If the fetched fragment already contained <style> and <script>
            tags they were NOT executed—so we need to:
            – move any <style> blocks to <head>
            – run any inline scripts manually.
       ----------------------------------------------------------------- */
      host.querySelectorAll('style').forEach(sty => {
        document.head.appendChild(sty.cloneNode(true));
        sty.remove();
      });

      host.querySelectorAll('script').forEach(scr => {
        try { new Function(scr.textContent)(); } catch (e) { console.error(e); }
        scr.remove();
      });

      /* 5. (Re)-wire tab clicks (defensive in case inline JS didn’t exist) */
      const tabs = host.querySelectorAll('.hospital-tab');
      const regions = host.querySelectorAll('.region');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.toggle('active', t === tab));
          regions.forEach(r => {
            r.style.display = r.id === 'reg-' + tab.dataset.region ? '' : 'none';
          });
        });
      });
    })
    .catch(err => {
      console.error('hospitalNetworkEmbed:', err);
      host.innerHTML =
        '<p style="color:red">Unable to load hospital list. Please try again later.</p>';
    });
})();
