using System;

//lote pertence a um evento
namespace ProEventos.Domain
{
    public class Lote
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Preco { get; set; }
        public DateTime? DataInicio { get; set; } // O interrogação '?' é para permitir cadastrar nulo
        public DateTime? DataFim { get; set; }
        public int Quantidade { get; set; }
        
        public int EventoId { get; set; }
        public Evento Evento { get; set; }
    }
}