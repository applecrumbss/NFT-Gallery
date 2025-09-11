function fetchNFTs() {
  const address = document.getElementById('wallet').value.trim();
  const gallery = document.getElementById('gallery');
  if (!address) {
    gallery.innerHTML = 'Please enter an Ethereum adress.';
    return;
  }
  gallery.innerHTML = 'Loading...';

  fetch('https://api.opensea.io/api/v1/assests?owner=${address}&order_direction=desc&limit=12')
     .then(response => response.json())
     .then(data => {
       gallery.innerHTML = '';
       if (data.assets && data.assets.length > 0) {
         data.assets.forEach(asset => { 
           const img = document.createElement('img');
           img.src = asset.image_preview_url || asset.image_url || '';
           img.alt = asset.name || 'NFT';
           gallery.appendChild(img);
         });
       } else {
         gallery.innerHTML = 'No NFTs found for this address.';
       }
     })
     .catch(() => {
      gallery.innerHTML = 'Error loading NFTs. Please try again later.';
     })
}