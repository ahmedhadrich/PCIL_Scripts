(function () {
  var containerId = 'hospital-list-container';
  var src = 'https://cdn.jsdelivr.net/gh/ahmedhadrich/PCIL_Scripts@main/hospital-list.html'; // update path if hosted elsewhere

  // Find or create the container
  var container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.currentScript.parentNode.insertBefore(container, document.currentScript);
  }

  // Fetch the external HTML and inject
  fetch(src)
    .then(function (response) { return response.text(); })
    .then(function (html) { container.innerHTML = html; })
    .catch(function (err) {
      console.error('Unable to load hospital list:', err);
      container.innerHTML = '<p>Unable to load hospital list. Please try again later.</p>';
    });
})();
