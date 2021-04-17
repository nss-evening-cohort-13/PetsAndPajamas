using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetsAndPajamas.DataAccess;

namespace PetsAndPajamas.Controllers
{
    [Route("api/PaymentTypes")]
    [ApiController]
    public class PaymentTypesController : ControllerBase
    {
        PaymentTypesRepository _repo;

        public PaymentTypesController()
        {
            _repo = new PaymentTypesRepository();
        }

        [HttpGet]
        public IActionResult GetAllPaymentTypes()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]

        public IActionResult GetById(int id)
        {
            var type = _repo.Get(id);

            if (type == null)
            {
                return NotFound("This payment type id does not exist");
            }

            return Ok(type);
        }
    }
}

