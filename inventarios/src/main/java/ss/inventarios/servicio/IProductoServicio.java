package ss.inventarios.servicio;

import ss.inventarios.modelo.Producto;

import java.util.List;

public interface IProductoServicio {
    public List<Producto> ListarProducto();

    public Producto buscarProductoPorId(Integer idProducto);

    public void guardarProducto(Producto producto);

    public void eliminarProductoPorId(Integer idProducto);
}
