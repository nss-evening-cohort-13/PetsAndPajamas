using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Models
{
    public class CustomerOrder
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public SiteUser SiteUser { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime ShipDate { get; set; }
        public string ShipAddress { get; set; }
        public string ShipCity { get; set; }
        public string ShipState { get; set; }
        public int ShipZip { get; set; }
        public string ShipCountry { get; set; }
        public int PaymentId { get; set; }
        public decimal TotalCost { get; set; }
        public bool IsCompleted { get; set; }
    }
}
