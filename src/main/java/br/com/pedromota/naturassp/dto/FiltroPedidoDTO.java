package br.com.pedromota.naturassp.dto;

import java.time.LocalDate;

public class FiltroPedidoDTO {
	private LocalDate dataInicio;
	private LocalDate datFim;
	private String    nome;
	private int       pago;
	private int       entregue;
	private int       cancelado;
	public LocalDate getDataInicio() {
		return dataInicio;
	}
	public void setDataInicio(LocalDate dataInicio) {
		this.dataInicio = dataInicio;
	}
	public LocalDate getDatFim() {
		return datFim;
	}
	public void setDatFim(LocalDate datFim) {
		this.datFim = datFim;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public int getPago() {
		return pago;
	}
	public void setPago(int pago) {
		this.pago = pago;
	}
	public int getEntregue() {
		return entregue;
	}
	public void setEntregue(int entregue) {
		this.entregue = entregue;
	}
	public int getCancelado() {
		return cancelado;
	}
	public void setCancelado(int cancelado) {
		this.cancelado = cancelado;
	}
	@Override
	public String toString() {
		return "FiltroPedidoDTO [dataInicio=" + dataInicio + ", datFim=" + datFim + ", nome=" + nome + ", pago=" + pago
				+ ", entregue=" + entregue + ", cancelado=" + cancelado + "]";
	}
	
	
}
