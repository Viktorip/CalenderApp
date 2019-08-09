using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalenderApp.Models
{
    public class CalenderEvent
    {
        public int Id { get; set; } = 0;
        public int UserId { get; set; } = 0;
        public string OrganizerName { get; set; } = "OrgNameNotSet";
        public string Name { get; set; } = "NameNotSet";
        public string LocationName { get; set; } = "LocationNotSet";
        public string StreetName { get; set; } = "StreetNameNotSet";
        public string ZipCode { get; set; } = "00000";
        public string City { get; set; } = "CityNotSet";
        public string State { get; set; } = "StateNotSet";
        public string Category { get; set; } = "CategoryNotSet";
        public double Price { get; set; } = 0.1;
        public DateTime BeginningDateTime { get; set; } = new DateTime();
        public string DescriptionText { get; set; } = "DescriptionNotSet";
        public string WebAddress { get; set; } = "WebNotSet";
    }
}
