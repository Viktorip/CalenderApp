using CalenderApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Diagnostics;

namespace CalenderApp.Data
{
    public class CalenderEventDAO
    {
        private CalenderContext ctx;

        public CalenderEventDAO(CalenderContext ctx)
        {
            this.ctx = ctx;
        }

        public List<CalenderEvent> GetCalenderEvents()
        {
            return ctx.CalenderEvents.ToList();
        }

        public List<CalenderEvent> GetCalenderEventsByDate(DateTime dt)
        {
            List<CalenderEvent> allce = ctx.CalenderEvents.ToList();
            List<CalenderEvent> cel = allce.FindAll(x => x.BeginningDateTime.Day == dt.Day);
            
            return cel;
        }

        public CalenderEvent GetCalenderEventById(int id)
        {
            CalenderEvent ce = ctx.CalenderEvents.ToList().Find(x => x.Id == id);
            return ce;
        }
    }
}
