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

        [HttpPut("{id}/disable")]
        public IActionResult DisableUser(int id)
        {
            _repo.Disable(id);

            return NoContent();
        }

        [HttpPost]
        public IActionResult AddAPaymentType(PaymentType paymentType)
        {
            _repo.Add(paymentType);
            return Created($"api/PaymentTypes/{paymentType.Id}", paymentType);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePaymentType(PaymentType paymentType)
        {
            _repo.Update(paymentType);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePaymentType(int id)
        {
            _repo.Remove(id);

            return Ok();
        }
    }
}

