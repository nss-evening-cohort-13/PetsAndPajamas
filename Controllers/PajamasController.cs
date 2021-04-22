using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetsAndPajamas.DataAccess;
using PetsAndPajamas.Models;

namespace PetsAndPajamas.Controllers
{
    [Route("api/Pajamas")]
    [ApiController]
    public class PajamasController : ControllerBase
    {
        PajamasRepository _repo;
        public PajamasController(PajamasRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllPajamas()
        {
            var pajamas = _repo.GetAll();

            return Ok(pajamas);
        }

        [HttpGet("cat")]
        public IActionResult GetAllCatPajamas()
        {
            var pajamas = _repo.GetAllCatPJs();

            return Ok(pajamas);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var pajama = _repo.Get(id);

            if (pajama == null)
            {
                return NotFound("This pajama id does not exist");
            }

            return Ok(pajama);
        }

        [HttpPut("{id}/disable")]
        public IActionResult DisablePajama(int id)
        {
            _repo.Disable(id);

            return NoContent();
        }

        [HttpPost]
        public IActionResult AddPajama(PajamaAdd pajama)
        {
            var newPajama = _repo.Add(pajama);

            return Created($"api/Pajamas/{newPajama.Id}", newPajama);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePajama(PajamaAdd pajama)
        {
            _repo.Update(pajama);

            return Ok();
        }
    }
}
