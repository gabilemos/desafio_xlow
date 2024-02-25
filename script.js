const apiUrl = "https://desafio.xlow.com.br/search";
let productsPerRow = 5;

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}
async function displayProducts() {
  const vitrine = document.querySelector(".vitrine");
  const products = await fetchProducts();

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <img src="${product.image}" alt="${
      product.name
    }" onclick="showMainImage(this)">
      <h3>${product.name}</h3>
      <div class="images">
        <!-- Imagens das variações do produto -->
      </div>
      <p class="price">Preço: R$ ${product.price}</p>
      ${
        product.discountedPrice
          ? `<p class="discounted-price">Preço com Desconto: R$ ${product.discountedPrice}</p>`
          : ""
      }
      <button>Comprar</button>
    `;
    vitrine.appendChild(productElement);
    updateProductCount(products.length);
  });
}

function updateProductCount(count) {
  document.getElementById("productCount").textContent = count;
}

function toggleProductLayout() {
  const vitrine = document.querySelector(".vitrine");
  productsPerRow = productsPerRow === 5 ? 4 : 5;
  vitrine.style.flexWrap = productsPerRow === 4 ? "wrap" : "wrap-reverse";
  document.querySelectorAll(".product").forEach((product) => {
    product.style.width = `calc(${100 / productsPerRow}% - 20px)`;
  });
}

function showMainImage(imageElement) {
  const mainImage = imageElement.src;
  imageElement.src = imageElement.parentNode.querySelector("img").src;
  imageElement.parentNode.querySelector("img").src = mainImage;
}
displayProducts();
