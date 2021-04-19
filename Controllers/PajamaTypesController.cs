using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetsAndPajamas.DataAccess;
using PetsAndPajamas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Controllers
{
    [Route("api/PajamaTypes")]
    [ApiController]
    public class PajamaTypesController : ControllerBase
    {
        PajamaTypesRepository _repo;
        public PajamaTypesController()
        {
            _repo = new PajamaTypesRepository();
        }

        [HttpGet]
        public IActionResult GetAllPajamaTypes()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var pajamaType = _repo.Get(id);

            if (pajamaType == null)
            {
                return NotFound("This pajama type id does not exist");
            }
            return Ok(pajamaType);
        }

        [HttpPut("{id}/disable")]
        public IActionResult DisablePajamaType(int id)
        {
            _repo.Disable(id);

            return NoContent();
        }

        [HttpPost]
        public IActionResult AddPajamaType(PajamaType pajamaType)
        {
            _repo.Add(pajamaType);

            return Created($"api/PajamaType/{pajamaType.Id}", pajamaType);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePajamaType(PajamaType pajamaType)
        {
            _repo.Update(pajamaType);

            return Ok(pajamaType);
        }
    }
}
