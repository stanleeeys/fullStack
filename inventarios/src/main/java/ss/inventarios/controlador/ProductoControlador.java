package ss.inventarios.controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ss.inventarios.modelo.Producto;
import ss.inventarios.servicio.ProductoServicio;

import java.util.List;

@RestController
//http://localhost:8080/inventario-app
@RequestMapping("/inventario-app")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoControlador {

    private static final Logger logger = LoggerFactory.getLogger(ProductoControlador.class);

    @Autowired
    private ProductoServicio productoServicio;

    @GetMapping("/productos")
    public List<Producto> obtenerProductos() {
        List<Producto> productos = this.productoServicio.ListarProducto();
        logger.info("Productos obtenidos:");
        productos.forEach(producto -> logger.info(producto.toString()));
        return productos;
    }
    //@PostMapping("")

}

