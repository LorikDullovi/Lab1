using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Costumer
    {
        public int CostumerId { get; set; }
        public string CostumerName { get; set; }
        public string CostumerSurname { get; set; }
        public string LivingPlace { get; set; }
        public string Bussines { get; set; }
        public int Telephone { get; set; }
        public int BankAccount { get; set; }
    }
}
