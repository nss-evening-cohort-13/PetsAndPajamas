using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetsAndPajamas.DataAccess;

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
        public IActionResult GetAllCustomerOrders()
        {
            var pajamas = _repo.GetAll();

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
    }
}
