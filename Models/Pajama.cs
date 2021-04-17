using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Models
{
    public class Pajama
    {
        public int Id { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public bool Patter { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Inventory { get; set; }
        public string Title { get; set; }
        public PajamaType PajamaType { get; set; }
        public PetType PetType { get; set; }
    }
}
