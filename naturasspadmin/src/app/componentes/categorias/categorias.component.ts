import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CatergoriaService } from 'src/app/servicos/catergoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public lista: Categoria[] = [];

  constructor(private service: CatergoriaService, private route: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem("LTRTK")){
      this.route.navigate(['/']);
    }

    this.service.getAllCategorias().subscribe(
      (res: Categoria[]) => {this.lista = res},
      (err) => {
        this.route.navigate(['/']);  
      }

    )
  }

}
