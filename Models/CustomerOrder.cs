using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Models
{
    public class CustomerOrder
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime ShipDate { get; set; }
        public string ShipAddress { get; set; }
        public string ShipCity { get; set; }
        public string ShipState { get; set; }
        public int ShipZip { get; set; }
        public string ShipCountry { get; set; }

        public SiteUser User { get; set; }
        public PaymentType PaymentType { get; set; }

    }
}
