import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/servicos/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public listaLetras!: string[];
  public keyword!: string;
  public lista!: Cliente[];
  public modo!: number;  //modo 0 - full | modo 1 - por letra | modo 2 - keyword

  constructor(private route: ActivatedRoute, private service: ClienteService) { 
    let letra = "A";
    this.listaLetras = [];
    for(let i=0; i<26; i++){
      letra = String.fromCharCode(65+i);
      this.listaLetras.push(letra);
    }

    this.route.queryParams.subscribe(
      (parameters)=>{
        if(parameters['letra']){
          this.service.buscarPorLetra(parameters['letra']).subscribe(
            (res: Cliente[]) => {this.lista = res}); 
        }
        else if(parameters['keyword']){
          this.service.buscarPorPalavraChave(parameters['keyword']).subscribe(
            (res: Cliente[]) => {this.lista = res}); 
        }
        else{
          this.service.buscarTodos().subscribe(
            (res: Cliente[]) => {this.lista = res}); 
        }
      }
    );



  }

  ngOnInit(): void {
  }

}
