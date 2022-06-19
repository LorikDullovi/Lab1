using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Export
    {
        public int ExportId { get; set; }
        public string ExportName { get; set; }
        public string City { get; set; }
        public string DateOfStarting { get; set; }
        public string Quantity { get; set; }
    }
}