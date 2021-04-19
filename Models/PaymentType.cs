using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.Models
{
    public class PaymentType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string AccountNumber { get; set; }
        public string Cvv { get; set; }
        public string ExpirationMonth { get; set; }
        public string ExpirationYear { get; set; }
        public string CreditCardType { get; set; }
        public bool IsActive { get; set; }
    }
}
