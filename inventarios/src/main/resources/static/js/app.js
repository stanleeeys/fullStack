document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    
    // Configurar el formulario de agregar producto
    document.getElementById('productoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const producto = {
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            precio: parseFloat(document.getElementById('precio').value),
            existencia: parseInt(document.getElementById('existencia').value)
        };

        try {
            const response = await fetch('/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });

            if (response.ok) {
                alert('Producto agregado exitosamente');
                document.getElementById('productoForm').reset();
                cargarProductos();
            } else {
                alert('Error al agregar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar el producto');
        }
    });

    // Configurar el botón de guardar edición
    document.getElementById('guardarEdicion').addEventListener('click', async () => {
        const producto = {
            id: document.getElementById('editId').value,
            nombre: document.getElementById('editNombre').value,
            descripcion: document.getElementById('editDescripcion').value,
            precio: parseFloat(document.getElementById('editPrecio').value),
            existencia: parseInt(document.getElementById('editExistencia').value)
        };

        try {
            const response = await fetch(`/api/productos/${producto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });

            if (response.ok) {
                alert('Producto actualizado exitosamente');
                const modal = bootstrap.Modal.getInstance(document.getElementById('editarModal'));
                modal.hide();
                cargarProductos();
            } else {
                alert('Error al actualizar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el producto');
        }
    });
});

async function cargarProductos() {
    try {
        const response = await fetch('/api/productos');
        const productos = await response.json();
        const tbody = document.getElementById('productosTableBody');
        tbody.innerHTML = '';

        productos.forEach(producto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion || ''}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${producto.existencia}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-primary" onclick="editarProducto(${JSON.stringify(producto)})">
                            Editar
                        </button>
                        <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">
                            Eliminar
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los productos');
    }
}

function editarProducto(producto) {
    document.getElementById('editId').value = producto.id;
    document.getElementById('editNombre').value = producto.nombre;
    document.getElementById('editDescripcion').value = producto.descripcion || '';
    document.getElementById('editPrecio').value = producto.precio;
    document.getElementById('editExistencia').value = producto.existencia;

    const modal = new bootstrap.Modal(document.getElementById('editarModal'));
    modal.show();
}

async function eliminarProducto(id) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
        try {
            const response = await fetch(`/api/productos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Producto eliminado exitosamente');
                cargarProductos();
            } else {
                alert('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar el producto');
        }
    }
}
