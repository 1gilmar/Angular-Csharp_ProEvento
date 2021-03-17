using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly IEventoService eventoService;

        public EventoController(IEventoService eventoService)
        {
            this.eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get() // public IEnumerable<Evento> Get()
        {
            // return this.eventoService.Eventos;
            try
            {
                var eventos = await this.eventoService.GetAllEventosAsync(true);
                if( eventos == null) return NotFound("Nenhum evento encontrado");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            // return this.eventoService.Eventos.FirstOrDefault(evento => evento.Id == id);
            try
            {
                var evento = await this.eventoService.GetEventoByIdAsync(id, true);
                if (evento == null) return NotFound($"Não encontrado evento com id: {id}");
                
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar recuperar evento. Erro: {ex.Message}");
            }
        }

        [HttpGet("{tema}/tema")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            // return this.eventoService.Eventos.FirstOrDefault(evento => evento.Id == id);
            try
            {
                var evento = await this.eventoService.GetAllEventosByTemaAsync(tema, true);
                if (evento == null) return NotFound($"Não encontrado evento com tema: {tema}");
                
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar recuperar evento. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try
            {
                var evento = await this.eventoService.AddEventos(model);
                if (evento == null) return BadRequest("Erro ao tentar adicionar evento");
                
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar adicionar evento. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Evento model)
        {
            try
            {
                var evento = await this.eventoService.UpdateEvento(id, model);
                if (evento == null) return BadRequest($"Erro ao editar evento {id} ");
                
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar editar evento. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                return await this.eventoService.DeleteEvento(id) ?
                    Ok("Deletado") :
                    BadRequest("Evento não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar deletar evento. Erro: {ex.Message}");
            }
        }
    }
}
