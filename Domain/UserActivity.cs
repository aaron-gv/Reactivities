using System;
using System.Collections.Generic;

namespace Domain
{
    public class UserActivity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string HostUsername { get; set; }
        public ICollection<ActivityAttendee> Attendees {get; set;} = new List<ActivityAttendee>();
    }
}