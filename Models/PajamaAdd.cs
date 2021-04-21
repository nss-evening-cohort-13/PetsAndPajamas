using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Models
{
    public class PajamaAdd
    {
        public int Id { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public bool Pattern { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Inventory { get; set; }
        public string Title { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsActive { get; set; }
        public int PajamaTypeId { get; set; }
        public int PetTypeId { get; set; }
        public string Image { get; set; }
    }
}
