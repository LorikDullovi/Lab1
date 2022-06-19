using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Subsidies
    {
        public int BeneficiaryId { get; set; }
        public string Beneficiary { get; set; }
        public int Telephone { get; set; }
        public int BankAccount { get; set; }
        public string Distributor { get; set; }
        public int Earnings { get; set; }
    }
}