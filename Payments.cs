using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Payments
    {
        public int PaymentsId { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public int Amounts { get; set; }

    }
}
