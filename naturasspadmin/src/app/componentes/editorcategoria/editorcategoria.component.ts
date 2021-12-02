import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CatergoriaService } from 'src/app/servicos/catergoria.service';

@Component({
  selector: 'app-editorcategoria',
  templateUrl: './editorcategoria.component.html',
  styleUrls: ['./editorcategoria.component.css']
})
export class EditorcategoriaComponent implements OnInit {

  public categoria: Categoria;
  public mode!: number ; //mode 0 = POST || mode 1 = PUT

  constructor(private activatedRoute: ActivatedRoute, private service: CatergoriaService) {
    this.categoria = new Categoria();
    let id = this.activatedRoute.snapshot.params['id'];
    if (id === "new"){
      this.mode = 0;
    }
    else{
      this.mode = 1;
      this.service.getById(id).subscribe(
        (res: Categoria) => {this.categoria = res; },
        (err) =>{
          console.log("status do erro ="+err.status);
          if(err.status == 404){

          }
          else{

          }
        }
      );

    }
   }

  ngOnInit(): void {
  }

}
