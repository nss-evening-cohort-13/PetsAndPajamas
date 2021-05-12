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
    [Route("api/SiteUsers")]
    [ApiController]
    public class SiteUsersController : ControllerBase
    {
        SiteUsersRepository _repo;
        public SiteUsersController()
        {
            _repo = new SiteUsersRepository();
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var user = _repo.Get(id);

            if (user == null)
            {
                return NotFound("This user id does not exist");
            }

            return Ok(user);
        }

        [HttpPut("{id}/disable")]
        public IActionResult DisableUser(string id)
        {
            _repo.Disable(id);

            return NoContent();
        }

        [HttpPost]
        public IActionResult AddUser(SiteUser siteUser)
        {
            _repo.Add(siteUser);

            return Created($"api/SiteUsers/{siteUser.Id}", siteUser);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(SiteUser siteUser)
        {
            _repo.Update(siteUser);

            return Ok(siteUser);
        }
    }
}
