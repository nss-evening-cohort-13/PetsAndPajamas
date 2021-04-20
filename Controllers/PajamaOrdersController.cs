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
    }
}
