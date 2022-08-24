import { Component, OnInit } from '@angular/core';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import { VendasPorDataDTO } from 'src/app/model/VendasPorDataDTO';
import { PedidoService } from 'src/app/servicos/pedido.service';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

@Component({
  selector: 'app-graficovendas',
  templateUrl: './graficovendas.component.html',
  styleUrls: ['./graficovendas.component.css']
})
export class GraficovendasComponent implements OnInit {

  public totais: VendasPorDataDTO[] = [];
  public canvas: any;
  public ctx: any;

  constructor(private service: PedidoService) { 
    this.service.recuperarTotaisDaSemana().subscribe(
      (res: VendasPorDataDTO[]) => {
        this.totais = res;
        console.log(this.totais);
        this.canvas = document.getElementById("meuGrafico");
        this.ctx = this.canvas.getContext("2d");
        let meuGrafico = new Chart(this.ctx, {
          type: 'line', 
          data:{
            datasets: [{
              label: 'Volume de vendas',
              data: [1, 2, 3, 4, 5, 6]
            }]
          },
          options:{
            responsive: true
          } 
        })
      });   
  }

  ngOnInit(): void {
  }

}
