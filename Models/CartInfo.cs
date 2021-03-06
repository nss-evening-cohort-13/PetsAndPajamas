using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Models
{
    public class CartInfo
    {
        public int OrderId { get; set; }
        public DateTime NewOrderDate { get; set; }
        public DateTime NewShipDate { get; set; }
        public string NewShipAddress { get; set; }
        public string NewShipCity { get; set; }
        public string NewShipState { get; set; }
        public int NewShipZip { get; set; }
        public string NewShipCountry { get; set; }
        public int UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserEmailAddress { get; set; }
        public double OrderTotalCost { get; set; }
        public string OrderPaymentType { get; set; }
        public string OrderAccountNumber { get; set; }
        public string OrderCreditCard { get; set; }
        public int PaymentId { get; set; }
        public int OrderExpMonth { get; set; }
        public int OrderExpYear { get; set; }
        public int OrderCVV { get; set; }
        public List<OrderPajama> OrderPajamas { get; set; }
        public bool CompletedOrder { get; set; }

    }
}
