package ss.inventarios.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ss.inventarios.modelo.Producto;
import ss.inventarios.repositorio.ProductoRepositotio;

import java.util.List;

@Service
public class ProductoServicio implements  IProductoServicio{

    @Autowired
    private ProductoRepositotio productoRepositotio;

    @Override
    public List<Producto> ListarProducto() {
      return this.productoRepositotio.findAll();
    }

    @Override
    public Producto buscarProductoPorId(Integer idProducto) {
        Producto producto = this.productoRepositotio.findById(idProducto).orElse(null);
        return producto;
    }

    @Override
    public void guardarProducto(Producto producto) {

        this.productoRepositotio.save(producto);

    }

    @Override
    public void eliminarProductoPorId(Integer idProducto) {

        this.productoRepositotio.deleteById(idProducto);
    }
}
