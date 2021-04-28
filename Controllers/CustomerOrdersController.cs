﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetsAndPajamas.DataAccess;
using PetsAndPajamas.Models;

namespace PetsAndPajamas.Controllers
{
    [Route("api/CustomerOrders")]
    [ApiController]
    public class CustomerOrdersController : ControllerBase
    {
        CustomerOrdersRepository _repo;

        public CustomerOrdersController(CustomerOrdersRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllCustomerOrders()
        {
            var customerOrders = _repo.GetAll();

            return Ok(customerOrders);
        }

        [HttpGet("{userId}")]
        public IActionResult GetById(string userId)
        {
            var order = _repo.Get(userId);

            if (order == null)
            {
                return NotFound("This order id does not exist");
            }

            return Ok(order);
        }

        [HttpPost]
        public IActionResult AddCustomerOrder(CustomerOrder customerOrder)
        {
            _repo.Add(customerOrder);
            return Created($"api/CustomerOrders/{customerOrder.Id}", customerOrder);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCustomerOrder(CustomerOrder customerOrder)
        {
            _repo.Update(customerOrder);
            return Ok();

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCustomerOrder(int id)
        {
            _repo.Remove(id);

            return Ok();
        }
    }
}
