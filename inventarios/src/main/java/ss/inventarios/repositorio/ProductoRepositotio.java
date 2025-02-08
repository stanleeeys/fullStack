package ss.inventarios.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import ss.inventarios.modelo.Producto;

public interface ProductoRepositotio extends JpaRepository<Producto, Integer> {

}
