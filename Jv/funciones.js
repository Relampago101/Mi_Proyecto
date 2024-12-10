// Evento de desplazamiento para cambiar el estilo del encabezado
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header_superiol");
    if (header) {
        header.classList.toggle("abajo", window.scrollY > 0);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');
    let currentIndex = 0;

    function updateCarousel(index) {
        const offset = -index * 100; // Calcula la posición en porcentaje
        carousel.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
    }

    function moveSlide(direction) {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = items.length - 1; // Ir al último elemento si retrocedes desde el primero
        } else if (currentIndex >= items.length) {
            currentIndex = 0; // Ir al primero si avanzas desde el último
        }
        updateCarousel(currentIndex);
    }

    prevButton.addEventListener('click', () => moveSlide(-1));
    nextButton.addEventListener('click', () => moveSlide(1));

    // Inicializar la posición del carrusel
    updateCarousel(currentIndex);
});




// Función para agregar un producto al carrito
function addProducto(ID_Guante, token) {
    if (!ID_Guante || !token) {
        console.error("ID_Guante o token no válidos.");
        return;
    }

    const url = "carrito.php";
    const formData = new FormData();
    formData.append("ID_Guante", ID_Guante);
    formData.append("action", "agregar");
    formData.append("token", token);

    fetch(url, { method: "POST", body: formData, mode: "cors" })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                const element = document.getElementById("num_cart");
                if (element) element.innerHTML = data.numero;
            } else {
                console.error("No se pudo agregar el producto al carrito.");
            }
        })
        .catch(error => console.error("Error al agregar producto al carrito:", error));
}

// Función para actualizar la cantidad de un producto
function actualizacantidad(cantidad, ID_Guante) {
    if (!ID_Guante || cantidad <= 0) {
        console.error("Datos no válidos para actualizar la cantidad.");
        return;
    }

    const url = "actualizar_carrito.php";
    const formData = new FormData();
    formData.append("action", "agregar");
    formData.append("ID_Guante", ID_Guante);
    formData.append("cantidad", cantidad);

    fetch(url, { method: "POST", body: formData, mode: "cors" })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                const subtotalElement = document.querySelector(`#subtotal_${ID_Guante}`);
                if (subtotalElement) {
                    subtotalElement.textContent = `Subtotal: $${data.sub}`;
                }

                const totalElement = document.querySelector("#total_general");
                if (totalElement) {
                    totalElement.textContent = `Total: $${data.total}`;
                }
            } else {
                console.error("Error al actualizar la cantidad del producto.");
            }
        })
        .catch(error => console.error("Error al actualizar cantidad:", error));
}

// Función para eliminar un producto
function eliminar(ID_Guante) {
    if (!ID_Guante) {
        console.error("ID_Guante no válido.");
        return;
    }

    const url = "actualizar_carrito.php";
    const formData = new FormData();
    formData.append("action", "eliminar");
    formData.append("ID_Guante", ID_Guante);

    fetch(url, { method: "POST", body: formData, mode: "cors" })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                const productElement = document.querySelector(`#producto_${ID_Guante}`);
                if (productElement) {
                    productElement.remove();
                }

                const totalElement = document.querySelector("#total_general");
                if (totalElement) {
                    totalElement.textContent = `Total: $${data.total}`;
                }

                verificarCarritoVacio();
            } else {
                console.error("No se pudo eliminar el producto del carrito.");
            }
        })
        .catch(error => console.error("Error al eliminar producto:", error));
}

// Función para verificar si el carrito está vacío
function verificarCarritoVacio() {
    const productos = document.querySelectorAll(".product-item");
    const container = document.querySelector(".container0");
    if (productos.length === 0 && container) {
        container.innerHTML = "<p>No hay productos en el carrito.</p>";
    }
}

// Función para abrir el modal
function openModal(id) {
    const modal = document.getElementById("modal_" + id);
    if (modal) {
        modal.style.display = "block";
    } else {
        console.error("No se encontró el modal para el producto con ID:", id);
    }
}

// Función para cerrar el modal
function closeModal(id) {
    const modal = document.getElementById("modal_" + id);
    if (modal) {
        modal.style.display = "none";
    } else {
        console.error("No se encontró el modal para el producto con ID:", id);
    }
}

// Cerrar modal cuando el usuario haga clic fuera del modal
window.addEventListener("click", function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

