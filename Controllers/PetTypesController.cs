using Microsoft.AspNetCore.Mvc;
using PetsAndPajamas.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Controllers
{
    [Route("api/PetTypes")]
    [ApiController]
    public class PetTypesController : Controller
    {
        PetTypesRepository _repo;
        public PetTypesController()
        {
            _repo = new PetTypesRepository();
        }

        [HttpGet]
        public IActionResult GetAllPetTypes()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var type = _repo.Get(id);

            if (type == null)
            {
                return NotFound("This pet type id does not exist");
            }

            return Ok(type);
        }

        [HttpPut("{id}/disable")]
        public IActionResult DisablePetType(int id)
        {
            _repo.Disable(id);

            return NoContent();
        }
    }
}
