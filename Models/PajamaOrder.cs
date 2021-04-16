using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Models
{
    public class PajamaOrder
    {
        public ShoppingCart ShoppingCart { get; set; }
        public Pajama Pajama { get; set; }
        public int Quantity { get; set; }
    }
}
