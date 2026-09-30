let pedido = [];

function agregarAlPedido(nombre, precio) {
    const productoExistente = pedido.find(function(producto) {
        return producto.nombre === nombre;
    });

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        pedido.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    mostrarPedido();
}

function mostrarPedido() {
    const lista = document.getElementById("lista-pedido");
    const total = document.getElementById("total-pedido");

    lista.innerHTML = "";

    let totalPedido = 0;

    pedido.forEach(function(producto, indice) {
        const item = document.createElement("div");

        item.innerHTML = `
    <p>
        ${producto.nombre} — $${(producto.precio * producto.cantidad).toLocaleString("es-AR")}
    </p>

    <button onclick="cambiarCantidad(${indice}, -1)">−</button>

    <strong> ${producto.cantidad} </strong>

    <button onclick="cambiarCantidad(${indice}, 1)">+</button>

    <button onclick="eliminarProducto(${indice})">Eliminar</button>
`;

        lista.appendChild(item);

        totalPedido += producto.precio * producto.cantidad;
    });

    total.textContent = "$" + totalPedido.toLocaleString("es-AR");
}

function cambiarCantidad(indice, cambio) {
    pedido[indice].cantidad += cambio;

    if (pedido[indice].cantidad <= 0) {
        pedido.splice(indice, 1);
    }

    mostrarPedido();
}function vaciarPedido() {
    pedido = [];
    mostrarPedido();
}
function eliminarProducto(indice) {
    pedido.splice(indice, 1);
    mostrarPedido();
}
function enviarPedidoWhatsApp() {
    const nombre = document.getElementById("nombre-cliente").value.trim();
    const contacto = document.getElementById("contacto-cliente").value.trim();
    const mensaje = document.getElementById("mensaje-cliente").value.trim();

    if (pedido.length === 0) {
        alert("Agregá al menos un producto al pedido.");
        return;
    }

    if (nombre === "" || contacto === "") {
        alert("Completá tu nombre y teléfono.");
        return;
    }

    let textoPedido = "*NUEVO PEDIDO - OCHO LUNAS*\n\n";

    textoPedido += "*Cliente:* " + nombre + "\n";
    textoPedido += "*Teléfono:* " + contacto + "\n\n";

    textoPedido += "*Pedido:*\n";

    let totalPedido = 0;

    pedido.forEach(function(producto) {
        const subtotal = producto.precio * producto.cantidad;

        textoPedido +=
            "• " +
            producto.nombre +
            " x" +
            producto.cantidad +
            " — $" +
            subtotal.toLocaleString("es-AR") +
            "\n";

        totalPedido += subtotal;
    });

    textoPedido += "\n*Total: $" + totalPedido.toLocaleString("es-AR") + "*";

    if (mensaje !== "") {
        textoPedido += "\n\n*Aclaración:* " + mensaje;
    }

    const telefonoOchoLunas = "5491161132975";

    const url = "https://wa.me/" + telefonoOchoLunas + "?text=%F0%9F%8C%99%20" + encodeURIComponent(textoPedido);

    window.open(url, "_blank");
}
let fotosCannabis = [
    "imagenes/BOX CANNABIS 1.png",
    "imagenes/BOX CANNABIS 2.png"
];

let fotoCannabisActual = 0;

function cambiarFotoCannabis(direccion) {
    fotoCannabisActual += direccion;

    if (fotoCannabisActual < 0) {
        fotoCannabisActual = fotosCannabis.length - 1;
    }

    if (fotoCannabisActual >= fotosCannabis.length) {
        fotoCannabisActual = 0;
    }

    document.getElementById("foto-box-cannabis").src =
        fotosCannabis[fotoCannabisActual];
}
document.getElementById("orden-productos").addEventListener("change", function () {

    const contenedor = document.querySelector(".productos");
    const productos = Array.from(contenedor.querySelectorAll(".producto"));

    if (this.value === "normal") {
        productos.forEach(producto => contenedor.appendChild(producto));
        return;
    }

    productos.sort((a, b) => {

        if (this.value === "az" || this.value === "za") {
            const nombreA = a.querySelector("h3").textContent.trim().toLowerCase();
            const nombreB = b.querySelector("h3").textContent.trim().toLowerCase();

            return this.value === "az"
                ? nombreA.localeCompare(nombreB)
                : nombreB.localeCompare(nombreA);
        }

        const precioA = parseInt(a.querySelector("strong").textContent.replace(/\D/g, ""));
        const precioB = parseInt(b.querySelector("strong").textContent.replace(/\D/g, ""));

        return this.value === "menor"
            ? precioA - precioB
            : precioB - precioA;
    });

    productos.forEach(producto => contenedor.appendChild(producto));
});
document.getElementById("orden-boxes").addEventListener("change", function () {

    const contenedor = document.querySelector(".boxes");
    const boxes = Array.from(contenedor.querySelectorAll(".box"));

    if (this.value === "normal") {
        boxes.forEach(box => contenedor.appendChild(box));
        return;
    }

    boxes.sort((a, b) => {

        if (this.value === "az" || this.value === "za") {
            const nombreA = a.querySelector("h3").textContent.trim().toLowerCase();
            const nombreB = b.querySelector("h3").textContent.trim().toLowerCase();

            return this.value === "az"
                ? nombreA.localeCompare(nombreB)
                : nombreB.localeCompare(nombreA);
        }

        const preciosA = a.querySelectorAll("strong");
        const preciosB = b.querySelectorAll("strong");

        const precioA = parseInt(preciosA[preciosA.length - 1].textContent.replace(/\D/g, ""));
        const precioB = parseInt(preciosB[preciosB.length - 1].textContent.replace(/\D/g, ""));

        return this.value === "menor"
            ? precioA - precioB
            : precioB - precioA;
    });

    boxes.forEach(box => contenedor.appendChild(box));
});