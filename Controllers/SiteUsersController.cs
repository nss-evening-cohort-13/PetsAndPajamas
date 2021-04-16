using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetsAndPajamas.DataAccess;
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
        public IActionResult GetById(int id)
        {
            var user = _repo.Get(id);

            if (user == null)
            {
                return NotFound("This user id does not exist");
            }

            return Ok(user);
        }
    }
}
