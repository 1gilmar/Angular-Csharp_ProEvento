using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {

        public IEnumerable<Evento> _evento = new Evento[]{
            new Evento(){
                EventoId = 1,
                Tema = "Angular",
                Local = "Belo Horizonte",
                Lote = "Primeiro lote",
                QtdPessoas = 250,
                DataEvento = DateTime.Now.AddDays(2).ToString("dd/mm/yyyy"),
                ImageURL = "www.google.com.br"
            },
            new Evento(){
                EventoId = 2,
                Tema = "C#",
                Local = "Goiania",
                Lote = "Segundo lote",
                QtdPessoas = 25,
                DataEvento = DateTime.Now.AddDays(12).ToString("dd/mm/yyyy"),
                ImageURL = "www.google.com.br"
            },
        };

        public EventoController()
        {

        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }
        [HttpGet("{id}")]
        public IEnumerable<Evento> GetByID(int id)
        {
            return _evento.Where(evento => evento.EventoId == id);
        }

        [HttpPost]
        public string Post()
        {
            return "Exemplo de post";
        }

        [HttpPut("{id}")]
        public string Put(int id)
        {
            return $"Exemplo de Put = {id}";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"Exemplo de Delete = {id}";
        }
    }
}
