using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Exports
    {
        public int ExportsId { get; set; }
        public string ExportsName { get; set; }
        public string Country { get; set; }
        public string DateOfStarting { get; set; }
        public string Quantity { get; set; }
    }
}