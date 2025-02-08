import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent implements OnInit {
  producto: Producto[] = []; // Inicializar como array vacío

  constructor(private productoServicio: ProductoService) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  private obtenerProductos() {
    this.productoServicio.obtenerProductosLista().subscribe(
      datos => {
        this.producto = datos;
        console.log('Productos cargados:', this.producto); // Mover console.log aquí
      },
      error => {
        console.error('Error al obtener los productos:', error); // Manejo de errores
      }
    );
  }

}
