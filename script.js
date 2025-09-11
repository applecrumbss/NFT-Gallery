let allNFTs = []; // Will hold all NFTs for filtering/searching

async function fetchNFTs() {
  // ...your existing fetch logic...
  // Let's assume you fetch and store NFTs in a variable called fetchedNFTs
  // After fetching:
  allNFTs = fetchedNFTs; // Save all NFTs
  displayNFTs(allNFTs);  // Show them
  populateCollectionFilter();
}

// Display NFTs in the gallery
function displayNFTs(nfts) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  if (nfts.length === 0) {
    gallery.innerHTML = '<p>No NFTs found.</p>';
    return;
  }
  nfts.forEach(nft => {
    const card = document.createElement('div');
    card.className = 'nft-card';
    card.innerHTML = `
      <img src="${nft.image}" alt="${nft.name}" style="max-width:200px;max-height:200px;">
      <h3>${nft.name}</h3>
      <p>${nft.description || ''}</p>
      <p><b>Collection:</b> ${nft.collectionName || 'Unknown'}</p>
    `;
    gallery.appendChild(card);
  });
}

// Populate filter dropdown
function populateCollectionFilter() {
  const select = document.getElementById('collectionFilter');
  const collections = [...new Set(allNFTs.map(nft => nft.collectionName).filter(Boolean))];
  select.innerHTML = '<option value="">All Collections</option>' +
    collections.map(name => `<option value="${name}">${name}</option>`).join('');
}

// Filter and search NFTs
function filterNFTs() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const collection = document.getElementById('collectionFilter').value;
  const filtered = allNFTs.filter(nft => {
    const matchesSearch = (nft.name && nft.name.toLowerCase().includes(searchTerm)) ||
                          (nft.description && nft.description.toLowerCase().includes(searchTerm));
    const matchesCollection = !collection || nft.collectionName === collection;
    return matchesSearch && matchesCollection;
  });
  displayNFTs(filtered);
}
