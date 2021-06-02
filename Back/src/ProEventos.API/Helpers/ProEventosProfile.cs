using AutoMapper;
using ProEventos.API.Dtos;
using ProEventos.Domain;

namespace ProEventos.API.Helpers
{
    //objeto que recebe todos os mapeamentos
    public class ProEventosProfile : Profile
    {
        public ProEventosProfile()
        {
            CreateMap<Evento, EventoDto>();
        }
    }
}