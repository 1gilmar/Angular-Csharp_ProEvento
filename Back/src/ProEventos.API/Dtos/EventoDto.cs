namespace ProEventos.API.Dtos
{
    //Objeto de transferencia
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; } // o ? permite cadastrar nulo
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string ImageURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }

        // public IEnumerable<Lote> Lotes { get; set; }
        // public IEnumerable<RedeSocial> RedesSociais { get; set; }
        // public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; }
    }
}