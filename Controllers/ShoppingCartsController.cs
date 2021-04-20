using Microsoft.AspNetCore.Mvc;
using PetsAndPajamas.DataAccess;
using PetsAndPajamas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Controllers
{
    [Route("api/ShoppingCarts")]
    [ApiController]
    public class ShoppingCartsController : Controller
    {
        ShoppingCartsRepository _repo;

        public ShoppingCartsController()
        {
            _repo = new ShoppingCartsRepository();
        }

        [HttpGet]
        public IActionResult GetAllCarts()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var cart = _repo.Get(id);

            if (cart == null)
            {
                return NotFound("This cart id does not exist");
            }

            return Ok(cart);
        }

        [HttpPut("{id}/disable")]
        public IActionResult DisableCart(int id)
        {
            _repo.Disable(id);

            return NoContent();
        }

        [HttpPost]
        public IActionResult AddCart(ShoppingCart shoppingCart)
        {
            _repo.Add(shoppingCart);

            return Created($"api/ShoppingCart/{shoppingCart.Id}", shoppingCart);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCart(ShoppingCart shoppingCart)
        {
            _repo.Update(shoppingCart);

            return Ok(shoppingCart);
        }

    }
}
