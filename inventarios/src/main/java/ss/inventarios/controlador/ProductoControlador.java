package ss.inventarios.controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ss.inventarios.modelo.Producto;
import ss.inventarios.servicio.IProductoServicio;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoControlador {

    private static final Logger logger = LoggerFactory.getLogger(ProductoControlador.class);

    @Autowired
    private IProductoServicio productoServicio;

    @GetMapping
    public List<Producto> obtenerProductos() {
        List<Producto> productos = this.productoServicio.ListarProducto();
        logger.info("Productos obtenidos:");
        productos.forEach(producto -> logger.info(producto.toString()));
        return productos;
    }

    @PostMapping
    public Producto agregarProducto(@RequestBody Producto producto) {
        logger.info("Producto a agregar: " + producto);
        this.productoServicio.guardarProducto(producto);
        return producto;
    }

    @PutMapping("/{idProducto}")
    public Producto actualizarProducto(@PathVariable Integer idProducto, @RequestBody Producto producto) {
        producto.setIdProducto(idProducto);
        logger.info("Producto a actualizar: " + producto);
        this.productoServicio.guardarProducto(producto);
        return producto;
    }

    @DeleteMapping("/{idProducto}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Integer idProducto) {
        logger.info("Producto a eliminar: " + idProducto);
        this.productoServicio.eliminarProductoPorId(idProducto);
        return ResponseEntity.noContent().build();
    }
}
