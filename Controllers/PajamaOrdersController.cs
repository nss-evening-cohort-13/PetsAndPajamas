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
    [Route("api/PajamaOrders")]
    [ApiController]
    public class PajamaOrdersController : ControllerBase
    {
        PajamaOrdersRepository _repo;
        public PajamaOrdersController(PajamaOrdersRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllPajamaOrders()
        {
            var pajamaOrders = _repo.GetAll();

            return Ok(pajamaOrders);
        }

        [HttpGet("currentMonth")]
        public IActionResult GetCurrentMonthPajamaOrders()
        {
            var pajamaOrders = _repo.GetThisMonth();

            return Ok(pajamaOrders);
        }

        [HttpGet("completed")]
        public IActionResult GetCompletedPajamaOrders()
        {
            var pajamaOrders = _repo.GetCompletedPajamaOrders();

            return Ok(pajamaOrders);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var pajamaOrder = _repo.Get(id);

            if (pajamaOrder == null)
            {
                return NotFound("This pajama id does not exist");
            }

            return Ok(pajamaOrder);
        }

        [HttpGet("{pajamaId}/{orderId}")]
        public IActionResult GetByPajamaId(int pajamaId, int orderId)
        {
            var pajamaOrder = _repo.GetByPajamaId(pajamaId, orderId);

            if (pajamaOrder == null)
            {
                return NotFound("This pajama order does not exist");
            }

            return Ok(pajamaOrder);
        }

        [HttpPost]
        public IActionResult AddPajamaOrder(PajamaOrder pajamaOrder)
        {
            _repo.Add(pajamaOrder);

            return Created($"api/PajamaOrders/{pajamaOrder.Id}", pajamaOrder);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePajamaOrder(PajamaOrder pajamaOrder)
        {
            _repo.Update(pajamaOrder);

            return Ok(pajamaOrder);
        }

        [HttpDelete("{pajamaId}/{orderId}")]
        public IActionResult DeletePajamaOrder(int pajamaId, int orderId)
        {
            _repo.Remove(pajamaId, orderId);

            return Ok();
        }

    }
}
