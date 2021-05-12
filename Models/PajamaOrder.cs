using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Models
{
    public class PajamaOrder
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int PajamaId { get; set; }
        public CustomerOrder CustomerOrder { get; set; }
        public Pajama Pajama { get; set; }
        public int Quantity { get; set; }
    }
}
